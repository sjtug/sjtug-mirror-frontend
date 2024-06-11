import Parser from "rss-parser";
import {HELP_SERVER, NEWS_SERVER} from "@/consts";

export const getNews = async () => {
  const resp = await fetch(NEWS_SERVER, {next: {revalidate: 60}});
  const text = await resp.text();
  if (!resp.ok) {
    throw new Error(text);
  }
  const parser = new Parser();
  return await parser.parseString(text);
}

export const newsLocatorFromHref = (href: string) => {
  if (href.endsWith("/")) {
    href = href.slice(0, -1);
  }
  const parts = href.split("/");
  return parts[parts.length - 1];
}

export const getHelp = async () => {
  const resp = await fetch(HELP_SERVER, {next: {revalidate: 300}});
  const text = await resp.text();
  if (!resp.ok) {
    throw new Error(text);
  }
  const parser = new Parser();
  return await parser.parseString(text);
}

export interface Article {
  name: string,
  href: string
}

export const articlesFromHelps = (helps: Parser.Output<{}>): Article[] =>
  helps.items.sort(({title: title1}, {title: title2}) => {
    if (title1 === undefined || title2 === undefined) {
      return 0;
    }
    return title1.localeCompare(title2);
  }).map((item: Parser.Item) => ({name: item.title ?? "", href: `/docs/${item.title}`}));

export type ArticleMap = Record<string, string>

export const articleMapFromArticles = (articles: Article[]): ArticleMap =>
  Object.fromEntries(articles.map(({name, href}) => [name, href]));