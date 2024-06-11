import {Anchor, Box, Group, Stack, Text} from "@mantine/core";
import classes from "@/app/global.module.css";
import {MyAnchor} from "@/components/MyAnchor";
import {IconExchange, IconExternalLink} from "@tabler/icons-react";
import {getNews, newsLocatorFromHref} from "@/serverRpcs";
import Link from "next/link";

interface NewsEntryProps {
  title: string,
  date: Date,
  locator: string
}

const NewsEntry = ({title, date, locator}: NewsEntryProps) => (
  <Box>
    <Text className={`${classes.textSmall} ${classes.textSecondary}`}>
      {new Intl.DateTimeFormat("zh-CN").format(date)}
    </Text>
    <Anchor className={classes.textSmall} href={"news#"+locator}>
      <Text inherit>{title}</Text>
    </Anchor>
  </Box>
)

export const News = async () => {
  let data;
  let error;
  try {
    data = await getNews();
  } catch (e) {
    error = e;
  }

  return (
    <Stack gap={"sm"}>
      <Text className={classes.textTitle}>镜像源新闻</Text>
      {
        error ? <Text c="red">加载失败 {error.toString()}</Text> : (
          <Stack gap={"xxs"}>
            {
              data?.items.slice(0, 5).map((item) => (
                <NewsEntry key={item.title} title={item.title ?? "无题"} locator={newsLocatorFromHref(item.link!)}
                           date={new Date(item.isoDate ?? "")}/>
              ))
            }
          </Stack>
        )
      }

      <MyAnchor size={"sm"} component={Link} href={"news"} target={"_blank"}
                rightIcon={<IconExternalLink size={16} stroke={1.5}/> }>
        ... 查看更多
      </MyAnchor>
    </Stack>
  )
}