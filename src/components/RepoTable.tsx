import { For, Show, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { format, type TDate } from "timeago.js";
import { HIDDEN, MIRRORZ_HELP, MIRRORZ_HELP_URL } from "@/config";
import { jsonFetcher } from "@/lib/fetch";
import type { ArticleMap, } from "@/lib/serverData";
import type { Repo, RepoSummary, WorkerOutcome } from "@/types";
import { CheckIcon, CloseIcon, HelpCircleIcon, SearchIcon, SpinnerIcon } from "@/components/icons";

import "@/styles/repo-table.css";

enum RepoStatus {
  SUCCESS,
  LOADING,
  RETRYING,
  FAILURE,
}

const isRepoSyncing = (repo: Repo): boolean =>
  repo.State === "running" || repo.State === "stopping" || !repo.Idle;

const deriveRepoStatus = (repo: Repo): RepoStatus => {
  if (isRepoSyncing(repo)) {
    return RepoStatus.LOADING;
  }
  if (repo.State === "retrying") {
    return RepoStatus.RETRYING;
  }
  return repo.Result ? RepoStatus.SUCCESS : RepoStatus.FAILURE;
};

const outcomeLabel = (outcome?: WorkerOutcome): string => {
  switch (outcome) {
    case "success":
      return "成功";
    case "unknown":
      return "状态未知";
    default:
      return "失败";
  }
};

const formatDurationZh = (ms: number): string => {
  const totalSecs = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  if (hours > 0) {
    return mins > 0 ? `${hours} 小时 ${mins} 分钟` : `${hours} 小时`;
  }
  if (mins > 0) {
    return `${mins} 分钟`;
  }
  return `${totalSecs} 秒`;
};

const statusTitle = (repo: Repo, status: RepoStatus, now: TDate | undefined): string | undefined => {
  const nowMs = now instanceof Date ? now.getTime() : typeof now === "number" ? now : Date.now();
  if (status === RepoStatus.LOADING) {
    const startedMs = repo.CurrentStartTime ? Date.parse(repo.CurrentStartTime) : Number.NaN;
    const elapsed = !Number.isNaN(startedMs) ? `已运行 ${formatDurationZh(nowMs - startedMs)}` : "";
    if (!repo.Result) {
      const prev = `上次同步${outcomeLabel(repo.LastOutcome)}，正在重新同步`;
      return elapsed ? `${prev}（${elapsed}）` : prev;
    }
    return elapsed ? `正在同步（${elapsed}）` : undefined;
  }
  if (status === RepoStatus.RETRYING) {
    const parts = [`上次同步${outcomeLabel(repo.LastOutcome)}，等待重试`];
    if (repo.NextRetryAt) {
      const nextDate = new Date(repo.NextRetryAt);
      if (!Number.isNaN(nextDate.getTime())) {
        parts.push(`预计 ${format(nextDate, "zh_CN", { relativeDate: now })}`);
      }
    }
    return parts.join(" · ");
  }
  if (status === RepoStatus.FAILURE) {
    const parts = [`上次同步${outcomeLabel(repo.LastOutcome)}`];
    if (repo.LastAttemptFinished) {
      const attDate = new Date(repo.LastAttemptFinished);
      if (!Number.isNaN(attDate.getTime())) {
        parts.push(`尝试于 ${format(attDate, "zh_CN", { relativeDate: now })}`);
      }
    }
    return parts.join(" · ");
  }
  return undefined;
};

const statusMeta = (status: RepoStatus): { text: string; className: string } => {
  switch (status) {
    case RepoStatus.SUCCESS:
      return { text: "同步成功", className: "success" };
    case RepoStatus.LOADING:
      return { text: "正在同步", className: "loading" };
    case RepoStatus.RETRYING:
      return { text: "等待重试", className: "retrying" };
    case RepoStatus.FAILURE:
      return { text: "同步失败", className: "failure" };
    default:
      return { text: "未知", className: "failure" };
  }
};

const StatusIcon = (props: { status: RepoStatus }) => {
  if (props.status === RepoStatus.LOADING) {
    return <SpinnerIcon class="status-icon loading" />;
  }
  if (props.status === RepoStatus.RETRYING) {
    return <SpinnerIcon class="status-icon loading retrying" />;
  }
  if (props.status === RepoStatus.SUCCESS) {
    return <CheckIcon class="status-icon success" />;
  }
  return <CloseIcon class="status-icon failure" />;
};

interface LugSummaryApiResponse {
  repos?: RepoSummary[];
  error?: string;
}

const filterRepos = (repos: [string, Repo][]) =>
  repos.filter(([name]) => !name.startsWith(".") && !HIDDEN.includes(name));

interface RepoTableProps {
  articleMap: ArticleMap;
}

type _Split<S, T extends string = never> = S extends `${infer C}${infer R}` ? _Split<R, T | C> : T;
type LowerLetter = _Split<"abcdefghijklmnopqrstuvwxyz">; // lowercase-only letter

const SEARCH_KEY: LowerLetter = "k";

const RepoTable = (props: RepoTableProps) => {
  const [search, setSearch] = createSignal("");
  const [repos, setRepos] = createSignal<[string, Repo][]>([]);
  const [lastFetch, setLastFetch] = createSignal<TDate | undefined>();
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | undefined>();
  let searchRef: HTMLInputElement | undefined;

  const fetchData = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const payload = await jsonFetcher<LugSummaryApiResponse>("/api/lug-summary.json");
      if (!payload.repos) {
        throw new Error(payload.error ?? "Unable to fetch lug reports");
      }

      const entries = payload.repos.map((item) => {
        const { name, ...repo } = item;
        return [name, repo] as [string, Repo];
      });
      setRepos(filterRepos(entries));
      setLastFetch(Date.now());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    void fetchData();
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === SEARCH_KEY) {
        e.preventDefault();
        searchRef?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    onCleanup(() => document.removeEventListener("keydown", handler));
  });

  const filteredRepos = createMemo(() => {
    const keyword = search().trim();
    if (!keyword) {
      return repos();
    }
    return repos().filter(([name]) => name.includes(keyword));
  });

  return (
    <section class="panel">
      <div class="row-between">
        <p class="text-title">镜像列表</p>
        <div class="search-wrapper">
          <div class="search-icon">
            <SearchIcon />
          </div>
          <input
            ref={(el) => {
              searchRef = el;
            }}
            class="search-input"
            type="search"
            placeholder="请输入"
            value={search()}
            onInput={(event) => setSearch(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setSearch("");
              }
            }}
            aria-label="搜索镜像仓库"
          />
          <div class="search-badge">
            <kbd>⌘ + {SEARCH_KEY.toUpperCase()}</kbd>
          </div>
        </div>
      </div>

      <Show when={error()}>
        {(message) => <p class="error">加载失败：{message()}</p>}
      </Show>

      <Show
        when={!loading()}
        fallback={
          <div class="skeleton-stack" aria-hidden="true">
            <For each={Array.from({ length: 10 }, (_, index) => index)}>
              {() => <div class="skeleton" />}
            </For>
          </div>
        }
      >
        <table class="repo-table">
          <thead>
            <tr>
              <th class="name">名称</th>
              <th>上次同步</th>
              <th>
                <span class="visible-from-sm">状态</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <For each={filteredRepos()}>
              {([name, repo]) => {
                const status = deriveRepoStatus(repo);
                const meta = statusMeta(status);
                const tooltip = statusTitle(repo, status, lastFetch());
                const parsedDate = new Date(repo.LastFinished ?? "");
                const lastSync = Number.isNaN(parsedDate.getTime())
                  ? "未知"
                  : format(parsedDate, "zh_CN", { relativeDate: lastFetch() });
                const helpHref = props.articleMap[name];
                const mirrorz = MIRRORZ_HELP[name];

                return (
                  <tr
                    classList={{
                      "row-loading": status === RepoStatus.LOADING,
                      "row-failure": status === RepoStatus.FAILURE || status === RepoStatus.RETRYING,
                    }}
                  >
                    <td class="name">
                      <div>
                        <a href={name}>{name}</a>
                        <span class="inline-links">
                          <Show when={helpHref}>
                            {(href) => (
                              <a class="icon-link" href={href()} aria-label={`查看 ${name} 帮助文档`}>
                                <HelpCircleIcon class="icon-svg" />
                              </a>
                            )}
                          </Show>
                          <Show when={mirrorz}>
                            {(mirrorzSlug) => (
                              <a
                                class="icon-link external"
                                href={`${MIRRORZ_HELP_URL}${mirrorzSlug()}/?mirror=SJTUG-${repo.server}`}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`查看 ${name} mirrorz 帮助文档`}
                              >
                                <HelpCircleIcon class="icon-svg" />
                              </a>
                            )}
                          </Show>
                        </span>
                      </div>
                    </td>
                    <td>{lastSync}</td>
                    <td>
                      <span class={`status ${meta.className}`} title={tooltip}>
                        <StatusIcon status={status} />
                        <span class="visible-from-sm">{meta.text}</span>
                      </span>
                    </td>
                  </tr>
                );
              }}
            </For>
          </tbody>
        </table>
      </Show>
    </section>
  );
};

export default RepoTable;
