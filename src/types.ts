export interface Article {
  name: string;
  href: string;
}

export interface Repo {
  Result: boolean;
  LastFinished?: string;
  Idle: boolean;
  server: string;
}

export interface RepoSummary extends Repo {
  name: string;
}

export interface LugReport {
  WorkerStatus: Record<string, Omit<Repo, "server">>;
}
