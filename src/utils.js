import { get } from "axios";
import useSWR from "swr";
import Parser from "rss-parser";

export const fetcher = (...args) =>
  get(...args)
    .then((resp) => resp.data)
    .catch((error) => console.log(error.toJSON()));

export const rssFetcher = (...args) =>
  get(...args)
    .then((resp) => resp.data)
    .then((resp) => {
      const parser = new Parser();
      return Promise.resolve(parser.parseString(resp));
    })
    .catch((error) => console.log(error.toJSON()));

export default function useData(url) {
  return useSWR(url, fetcher);
}

export function useRSSData(url) {
  return useSWR(url, rssFetcher);
}
