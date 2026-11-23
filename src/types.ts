export interface Article {
  name: string;
  href: string;
}

import type { SiteName } from "@/config";

export type WorkerState = "idle" | "running" | "queued" | "retrying" | "stopping";

export type WorkerOutcome = "success" | "fail" | "timeout" | "canceled" | "unknown";

export interface Repo {
  Result: boolean;
  LastFinished?: string;
  Idle: boolean;
  State?: WorkerState;
  LastOutcome?: WorkerOutcome;
  CurrentStartTime?: string;
  LastAttemptFinished?: string;
  NextRetryAt?: string;
  RedirectTarget?: string;
  server: SiteName;
}

export interface RepoSummary extends Repo {
  name: string;
}

export interface LugReport {
  WorkerStatus: Record<string, Omit<Repo, "server">>;
}
