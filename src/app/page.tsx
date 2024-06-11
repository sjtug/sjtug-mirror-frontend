import classes from './global.module.css';
import {Box, Container, Grid, GridCol, Stack,} from "@mantine/core";
import {Banner} from "@/parts/banner";
import {News} from "@/parts/news";
import {Repos} from "@/parts/repos";
import {articleMapFromArticles, articlesFromHelps, getHelp} from "@/serverRpcs";
import {RelLinks} from "@/parts/relLinks";


export default async function Home() {
  const helps = await getHelp();
  const articleMap = articleMapFromArticles(articlesFromHelps(helps));
  return (
    <>
      <Banner/>
      <Container className={classes.container} mb={"xxl"}>
        <Box mx={"sm"}>
          <Grid gutter={"xl"}>
            <GridCol span={{base: 12, md: 9, lg: 8}}>
              <Repos articleMap={articleMap}/>
            </GridCol>
            <GridCol span={{base: 12, md: 3, lg: 4}}>
              <Stack gap={"xl"}>
                <News/>
                <RelLinks/>
              </Stack>
            </GridCol>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
