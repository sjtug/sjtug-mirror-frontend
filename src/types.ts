export interface Article {
  name: string;
  href: string;
}

import type { SiteName } from "@/config";

export interface Repo {
  Result: boolean;
  LastFinished?: string;
  Idle: boolean;
  server: SiteName;
}

export interface RepoSummary extends Repo {
  name: string;
}

export interface LugReport {
  WorkerStatus: Record<string, Omit<Repo, "server">>;
}
