"use client";

import useSWR, {Fetcher, Key} from "swr";
import {useEffect, useMemo} from "react";
import {notifications} from "@mantine/notifications";
import {IconX} from "@tabler/icons-react";
import {HIDDEN, LUG_SERVERS, LugServer} from "@/consts";

export interface LugReport {
  WorkerStatus: Record<string, Repo>
}

export interface Repo {
  Result: boolean,
  LastFinished?: string,
  Idle: boolean,
  server: string
}

const jsonFetcher: Fetcher<any, string> = async (url) => {
  const resp = await fetch(url);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text)
  }
  return await resp.json();
}

const castFetcher = <T, >(fetcher: Fetcher<T, string>) => fetcher;

type FetcherArray<T extends any[], U extends Key> = { [K in keyof T]: Fetcher<T[K], U> };
type ResultArray<T extends any[]> = { [K in keyof T]: T[K] };

const liftFetchers = <T extends any[], U extends Key>(fetchers: FetcherArray<T, U>, ignoreError: boolean): Fetcher<ResultArray<T>, U[]> => {
  return async (inputs: U[]) => {
    if (ignoreError) {
      // @ts-ignore
      const tryResults = await Promise.all(fetchers.map((fetcher, index) => fetcher(inputs[index]).catch(e => e)));
      const results = tryResults.filter((x) => !(x instanceof Error));
      return results as ResultArray<T>;
    }
    // @ts-ignore
    const results = await Promise.all(fetchers.map((fetcher, index) => fetcher(inputs[index])));
    return results as ResultArray<T>;
  };
};

const filterRepos = (repos: [string, Repo][]) =>
  repos.filter(([name, _]) => !name.startsWith(".") && !HIDDEN.includes(name))

const lugFetcher: Fetcher<LugReport, LugServer> = async ({name, url}) => {
  const fetcher = castFetcher<LugReport>(jsonFetcher);
  const report = await fetcher(url);
  for (const k of Object.keys(report.WorkerStatus)) {
    report.WorkerStatus[k].server = name
  }
  return report
}

export const useLugReport = () => {
  const {
    data,
    error,
    isLoading,
    isValidating
  } = useSWR(LUG_SERVERS, liftFetchers(LUG_SERVERS.map(() => lugFetcher), true))
  const mergedData = useMemo(() => {
      const merged = data?.map((data) => data.WorkerStatus).reduce((prev, x) => ({...prev, ...x}))
      if (merged !== undefined) {
        const entries = Object.entries(merged)
        const sorted = entries.sort((([k1, _v1], [k2, _v2]) => k1.localeCompare(k2)))
        return filterRepos(sorted)
      }
      return
    }
    , [data])
  return {data: mergedData, error, isLoading, isValidating}
};

export const useError = (error: any) => {
  useEffect(() => {
    if (error) {
      notifications.show({
        color: "red",
        title: "出错了",
        icon: <IconX/>,
        message: error.toString(),
      })
    }
  }, [error]);
}