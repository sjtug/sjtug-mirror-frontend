import { LUG_SERVERS } from "@/config";
import { jsonFetcher } from "@/lib/fetch";
import type { LugReport, Repo } from "@/types";

type RepoEntry = [string, Repo];

const cache = {
  expiresAt: 0,
  repos: [] as RepoEntry[],
};

const fetchLugReport = async (serverName: string, url: string): Promise<RepoEntry[]> => {
  const report = await jsonFetcher<LugReport>(url);
  return Object.entries(report.WorkerStatus).map(([name, item]) => [
    name,
    {
      ...item,
      server: serverName,
    },
  ]);
};

const statusPriority = (repo: Repo): number => {
  if (!repo.Result) {
    return 3;
  }
  if (!repo.Idle) {
    return 2;
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

export const getMergedLugRepos = async (): Promise<RepoEntry[]> => {
  const now = Date.now();
  if (cache.expiresAt > now) {
    return cache.repos;
  }

  const settled = await Promise.allSettled(
    LUG_SERVERS.map((server) => fetchLugReport(server.name, server.url)),
  );

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
  for (const [name, repo] of allEntries) {
    const previous = merged.get(name);
    merged.set(name, previous ? chooseRepo(previous, repo) : repo);
  }

  const repos = [...merged.entries()].sort(([a], [b]) => a.localeCompare(b));
  cache.expiresAt = now + 30_000;
  cache.repos = repos;
  return repos;
};
