import { FTP_SUMMARY_URL, LUG_SERVERS } from "@/config";
import type { SiteName } from "@/config";
import { jsonFetcher } from "@/lib/fetch";
import type { LugReport, Repo } from "@/types";

type RepoEntry = [string, Repo];
type RawWorkerStatus = Omit<Repo, "server">;

const FTP_TARGET_RE = /^(?:\{scheme\}|https?):\/\/ftp\.sjtu\.edu\.cn\/(.+?)\/?$/i;

const cache = {
  expiresAt: 0,
  repos: [] as RepoEntry[],
};

const toPublicRepo = (item: RawWorkerStatus, server: SiteName): Repo => ({
  Result: item.Result,
  LastFinished: item.LastFinished,
  Idle: item.Idle,
  State: item.State,
  LastOutcome: item.LastOutcome,
  CurrentStartTime: item.CurrentStartTime,
  LastAttemptFinished: item.LastAttemptFinished,
  NextRetryAt: item.NextRetryAt,
  RedirectTarget: item.RedirectTarget,
  server,
});

const fetchLugReport = async (serverName: SiteName, url: string): Promise<RepoEntry[]> => {
  const report = await jsonFetcher<LugReport>(url);
  return Object.entries(report.WorkerStatus).map(([name, item]) => [
    name,
    toPublicRepo(item, serverName),
  ]);
};

const extractFtpWorkerPath = (target?: string): string | null => {
  if (!target) {
    return null;
  }
  const match = FTP_TARGET_RE.exec(target.trim());
  return match ? match[1] : null;
};

const isSyncing = (repo: Repo): boolean =>
  repo.State === "running" || repo.State === "stopping" || !repo.Idle;

const statusPriority = (repo: Repo): number => {
  if (isSyncing(repo)) {
    return 2;
  }
  if (repo.State === "retrying") {
    return 3;
  }
  if (!repo.Result) {
    return 4;
  }
  return 1;
};

const timestamp = (value?: string): number => {
  if (!value) {
    return 0;
  }
  const time = Date.parse(value);
  return Number.isNaN(time) ? 0 : time;
};

const chooseRepo = (current: Repo, incoming: Repo): Repo => {
  const currentPriority = statusPriority(current);
  const incomingPriority = statusPriority(incoming);

  if (incomingPriority > currentPriority) {
    return incoming;
  }
  if (incomingPriority < currentPriority) {
    return current;
  }

  return timestamp(incoming.LastFinished) >= timestamp(current.LastFinished)
    ? incoming
    : current;
};

const resolveFtpStatus = (
  repo: Repo,
  ftpWorkers: Record<string, RawWorkerStatus>,
): Repo => {
  const targetPath = extractFtpWorkerPath(repo.RedirectTarget);
  if (!targetPath) {
    return repo;
  }

  // Umbrella paths like `fedora` are external placeholders on mirror-ftp whose
  // actual sync workers live at `fedora/linux`, `fedora/epel`, etc.
  const childPrefix = `${targetPath}/`;
  const childRepos = Object.entries(ftpWorkers)
    .filter(([key]) => key.startsWith(childPrefix))
    .map(([, item]): Repo => toPublicRepo(item, repo.server));
  if (childRepos.length > 0) {
    const aggregated = childRepos.reduce(chooseRepo);
    return {
      ...aggregated,
      server: repo.server,
      RedirectTarget: repo.RedirectTarget,
    };
  }

  const direct = ftpWorkers[targetPath];
  if (!direct) {
    return repo;
  }
  return {
    ...toPublicRepo(direct, repo.server),
    RedirectTarget: repo.RedirectTarget,
  };
};

export const getMergedLugRepos = async (): Promise<RepoEntry[]> => {
  const now = Date.now();
  if (cache.expiresAt > now) {
    return cache.repos;
  }

  const [settled, ftpResult] = await Promise.all([
    Promise.allSettled(
      LUG_SERVERS.map((server) => fetchLugReport(server.name, server.url)),
    ),
    jsonFetcher<LugReport>(FTP_SUMMARY_URL)
      .then((report) => report.WorkerStatus)
      .catch(() => null),
  ]);

  const allEntries = settled
    .filter(
      (item): item is PromiseFulfilledResult<RepoEntry[]> =>
        item.status === "fulfilled",
    )
    .flatMap((item) => item.value);

  if (allEntries.length === 0) {
    const firstError = settled.find(
      (item): item is PromiseRejectedResult => item.status === "rejected",
    );
    throw firstError?.reason ?? new Error("Unable to fetch lug reports");
  }

  const merged = new Map<string, Repo>();
  for (const [name, rawRepo] of allEntries) {
    const repo = ftpResult ? resolveFtpStatus(rawRepo, ftpResult) : rawRepo;
    const previous = merged.get(name);
    merged.set(name, previous ? chooseRepo(previous, repo) : repo);
  }

  const repos = [...merged.entries()].sort(([a], [b]) => a.localeCompare(b));
  cache.expiresAt = now + 30_000;
  cache.repos = repos;
  return repos;
};
