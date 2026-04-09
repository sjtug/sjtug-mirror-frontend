import { For, Show, createMemo, createSignal } from "solid-js";
import type { Article } from "@/types";

import "@/styles/doc-nav.css";

interface DocNavProps {
  articles: Article[];
  currentRepo: string;
  mode?: "desktop" | "mobile";
}

const DocNav = (props: DocNavProps) => {
  const mode = () => props.mode ?? "desktop";
  const [query, setQuery] = createSignal("");
  const [open, setOpen] = createSignal(false);

  const filteredArticles = createMemo(() => {
    const keyword = query().trim();
    if (!keyword) {
      return props.articles;
    }
    return props.articles.filter((article) => article.name.includes(keyword));
  });

  const navBody = (
    <div class="docs-nav">
      <input
        class="search-input"
        type="search"
        placeholder="帮助文档"
        value={query()}
        onInput={(event) => setQuery(event.currentTarget.value)}
        aria-label="搜索帮助文档"
      />
      <ul class="docs-nav-list">
        <For each={filteredArticles()}>
          {(article) => (
            <li>
              <a
                href={article.href}
                class="docs-link"
                classList={{ active: article.name === props.currentRepo }}
                onClick={() => {
                  if (mode() === "mobile") {
                    setOpen(false);
                  }
                }}
              >
                {article.name}
              </a>
            </li>
          )}
        </For>
      </ul>
    </div>
  );

  return (
    <>
      <Show when={mode() === "desktop"}>{navBody}</Show>
      <Show when={mode() === "mobile"}>
        <button class="docs-mobile-toggle" type="button" onClick={() => setOpen((prev) => !prev)}>
          文档导航 {open() ? "▲" : "▼"}
        </button>
        <Show when={open()}>
          <div class="docs-mobile-panel">{navBody}</div>
        </Show>
      </Show>
    </>
  );
};

export default DocNav;
