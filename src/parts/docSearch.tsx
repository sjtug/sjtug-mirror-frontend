"use client";

import classes from "@/app/global.module.css";
import {SearchBar} from "@/components/SearchBar";
import {createSpotlight, Spotlight, SpotlightActionData} from "@mantine/spotlight";
import {useRouter} from "next/navigation";
import {ActionIcon} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {Article} from "@/serverRpcs";

type Variant = "full" | "mini";

const [fullStore, fullStoreSpotlight] = createSpotlight();
const [miniStore, miniStoreSpotlight] = createSpotlight();

interface DocSearchProps {
  articles: Article[];
  variant?: Variant;
}

export const DocSearch = ({articles, variant: variant_}: DocSearchProps) => {
  const variant = variant_ ?? "full";
  const route = useRouter();
  const actions: SpotlightActionData[] = articles.map(({name, href}) =>
    ({id: name, label: name, onClick: () => route.push(href)}));

  const spotlight = variant === "full" ? fullStoreSpotlight : miniStoreSpotlight;
  const store = variant === "full" ? fullStore : miniStore;

  return (
    <>
      {
        variant === "full" ? (
          <SearchBar placeholder={"帮助"} hotkeys={[]} onClick={spotlight.open} onFocus={(e) => {
            e.currentTarget.blur()
          }} classNames={{input: classes.forcePointer}}/>
        ) : (
          <ActionIcon variant={"default"} radius={"xl"} onClick={spotlight.open} size={"xl"}
                      style={{boxShadow: "var(--mantine-shadow-md)"}}>
            <IconSearch size={24} stroke={1.5}/>
          </ActionIcon>
        )
      }

      <Spotlight store={store} actions={actions} limit={variant === "full" ? 5 : undefined}
                 scrollable={variant === "mini"} shortcut={variant === "full" ? undefined : null} highlightQuery/>
    </>
  )
}
