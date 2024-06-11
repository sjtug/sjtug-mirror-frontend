import "../docs.css"
import {Stack, Text, TypographyStylesProvider} from "@mantine/core";
import {articlesFromHelps, getHelp} from "@/serverRpcs";

export default async function DocPage({params: {repo: repo_}}: { params: { repo: string[] } }) {
  const repo = repo_.join("/")
  const helps = await getHelp();
  const help = helps.items.find((item) => item.title === repo);
  const articles = articlesFromHelps(helps);
  return (
    <>
      <Stack gap={"xl"}>
        <Text size={"xxxl"} fw={300}>{repo}</Text>
        <TypographyStylesProvider className={"sjtug-docs"}>
          <div dangerouslySetInnerHTML={{__html: help?.content ?? ""}}/>
        </TypographyStylesProvider>
      </Stack>
    </>
  )
}