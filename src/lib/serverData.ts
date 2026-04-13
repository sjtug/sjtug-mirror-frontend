import Parser from "rss-parser";
import { HELP_SERVER, NEWS_SERVER } from "@/config";
import type { Article } from "@/types";

const cache = new Map<
  string,
  {
    expiresAt: number;
    value?: unknown;
    pending?: Promise<unknown>;
  }
>();

const cached = async <T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>,
): Promise<T> => {
  const now = Date.now();
  const entry = cache.get(key);
  if (entry && entry.value !== undefined && entry.expiresAt > now) {
    return entry.value as T;
  }
  if (entry?.pending) {
    return (await entry.pending) as T;
  }

  const pending = loader();
  cache.set(key, {
    expiresAt: now + ttlMs,
    pending,
  });

  try {
    const value = await pending;
    cache.set(key, {
      value,
      expiresAt: now + ttlMs,
    });
    return value;
  } catch (error) {
    cache.delete(key);
    throw error;
  }
};

const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const text = await response.text();
  if (!response.ok) {
    throw new Error(text);
  }
  return text;
};

export const getNews = async () =>
  cached("news", 60_000, async () => {
    const text = await fetchText(NEWS_SERVER);
    const parser = new Parser();
    return parser.parseString(text);
  });

export const newsLocatorFromHref = (href: string) => {
  const normalized = href.endsWith("/") ? href.slice(0, -1) : href;
  const parts = normalized.split("/");
  return parts[parts.length - 1];
};

export const getHelp = async () =>
  cached("help", 300_000, async () => {
    const text = await fetchText(HELP_SERVER);
    const parser = new Parser();
    return parser.parseString(text);
  });

export const articlesFromHelps = (helps: Parser.Output<unknown>): Article[] =>
  helps.items
    .sort(({ title: title1 }, { title: title2 }) => {
      if (title1 === undefined || title2 === undefined) {
        return 0;
      }
      return title1.localeCompare(title2);
    })
    .map((item: Parser.Item) => ({
      name: item.title ?? "",
      href: `/docs/${item.title}`,
    }));

export type ArticleMap = Record<string, string>;

export const articleMapFromArticles = (articles: Article[]): ArticleMap =>
  Object.fromEntries(articles.map(({ name, href }) => [name, href]));
