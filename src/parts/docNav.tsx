"use client";

import {Article} from "@/serverRpcs";
import {Box, NavLink, ScrollArea} from "@mantine/core";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {DocSearch} from "@/parts/docSearch";

interface DocNavProps {
  articles: Article[]
}

export const DocNav = ({articles}: DocNavProps) => {
  const pathname = usePathname();
  const repo = pathname.slice("/docs/".length);

  return (
    <>
      <Box my={"sm"}>
        <DocSearch articles={articles} variant={"full"}/>
      </Box>
      {/*<Box style={{position: "sticky", top: 0}} p={"md"} bg={"var(--mantine-color-body)"}>*/}
      {/*  <DocSearch articles={articles} variant={"full"} />*/}
      {/*</Box>*/}
      <ScrollArea h={"70vh"}>
        {
          articles.map(({name, href}) => (
            <NavLink component={Link} key={name} href={href} label={name} active={repo === name}/>
          ))
        }
      </ScrollArea>
    </>
  )
}