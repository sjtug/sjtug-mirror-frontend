"use client";

import classes from "@/app/global.module.css";
import {format, TDate} from "timeago.js"
import {IconCheck, IconHelp, IconInfoCircleFilled, IconX} from "@tabler/icons-react";
import {
  ActionIcon,
  Anchor,
  Box,
  Group,
  Loader,
  Skeleton,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text
} from "@mantine/core";
import {SearchBar} from "@/components/SearchBar";
import {memo, useEffect, useState} from "react";
import {Repo, useError, useLugReport} from "@/rpcs";
import {ArticleMap} from "@/serverRpcs";
import Link from "next/link";
import {MIRRORZ_HELP, MIRRORZ_HELP_URL} from "@/consts";

enum RepoStatus {
  SUCCESS,
  LOADING,
  FAILURE
}

interface TableEntryProps {
  name: string,
  server: string
  status: RepoStatus,
  lastSync: string,
  helpHref?: string,
  mirrorzHref?: string
}

const TableEntry = ({name, server, status, lastSync, helpHref, mirrorzHref}: TableEntryProps) => {
  const [cTr, statusText, icon] = {
    // eslint-disable-next-line react/jsx-key
    [RepoStatus.SUCCESS]: [classes.successTr, "同步成功", <IconCheck stroke={1.5}/>],
    // eslint-disable-next-line react/jsx-key
    [RepoStatus.LOADING]: [classes.loadingTr, "正在同步", <Loader className={classes.Tr__Loader}/>],
    // eslint-disable-next-line react/jsx-key
    [RepoStatus.FAILURE]: [classes.warningTr, "同步失败", <IconX stroke={1.5}/>]
  }[status];

  return (
    // @ts-ignore
    <TableTr key={name} className={cTr}>
      <TableTd className={`${classes.Tr__Td} ${classes.Tr__Td_name}`}>
        <Group gap={0} wrap={"nowrap"}>
          <Anchor href={name} inherit>
            {name}
          </Anchor>
          {
            helpHref && <ActionIcon variant={"subtle"} size="xs" radius={"xl"} component={Link} href={helpHref}>
                  <IconHelp size={16} stroke={2}/>
              </ActionIcon>
          }
          {
            mirrorzHref &&
              <ActionIcon variant={"subtle"} color={"#15658a"} size="xs" radius={"xl"} component={Link}
                          href={MIRRORZ_HELP_URL+mirrorzHref+"/?mirror=SJTUG-"+server} target={"_blank"}>
                  <IconHelp size={16} stroke={2}/>
              </ActionIcon>
          }
        </Group>
      </TableTd>
      <TableTd className={classes.Tr__Td}>{lastSync}</TableTd>
      <TableTd className={`${classes.Tr__Td} ${classes.Tr__Td_status}`}>
        <Group gap={0}>
          {icon}
          <Text visibleFrom={"sm"} inherit>
            {statusText}
          </Text>
        </Group>
      </TableTd>
    </TableTr>
  );
}

const MemoTableEntry = memo(TableEntry);

interface TableBodyProps {
  articleMap: ArticleMap,
  data: [string, Repo][],
  fetchTime?: TDate
}

const TableBody = ({articleMap, data, fetchTime}: TableBodyProps) =>
  data.map(([name, repo]) => {
    const status = repo.Result ?
      repo.Idle ? RepoStatus.SUCCESS : RepoStatus.LOADING
      : RepoStatus.FAILURE
    const lastSync = format(new Date(repo.LastFinished ?? 0), "zh_CN", {relativeDate: fetchTime});
    return (<MemoTableEntry key={name} name={name} server={repo.server} status={status} lastSync={lastSync}
                            helpHref={articleMap[name]} mirrorzHref={MIRRORZ_HELP[name]}/>)
  });

interface ReposProps {
  articleMap: ArticleMap
}

export const Repos = ({articleMap}: ReposProps) => {
  const [search, setSearch] = useState("");
  const {data, isLoading, error} = useLugReport();
  const [lastFetch, setLastFetch] = useState<TDate>();

  useEffect(() => {
    setLastFetch(Date.now())
  }, [data]);

  useError(error);

  return (
    <Stack gap={"sm"}>
      <Group>
        <Text className={classes.textTitle}>镜像列表</Text>
        <Box style={{flexGrow: 9999}}/>
        <SearchBar style={{flexGrow: 1, flexBasis: 200}} value={search} onChange={setSearch}/>
      </Group>
      <Table verticalSpacing={"xxs"} highlightOnHover stickyHeader>
        <TableThead w={"100%"}>
          <TableTr>
            <TableTh className={`${classes.Tr__Td} ${classes.Tr__Td_name}`}>名称</TableTh>
            <TableTh className={classes.Tr__Td}>上次同步</TableTh>
            <TableTh className={classes.Tr__Td}>
              <Text visibleFrom={"sm"} inherit>状态</Text>
            </TableTh>
          </TableTr>
        </TableThead>
        {
          !isLoading &&
            <TableTbody>
                <TableBody articleMap={articleMap} fetchTime={lastFetch}
                           data={(data?.filter((([name, _]) => name.includes(search)))) ?? []}/>
            </TableTbody>
        }
      </Table>
      {
        isLoading && (
          <Stack gap={"md"}>
            {
              Array(10).fill(1).map((_, i) => (
                <Skeleton key={i} height={15}/>
              ))
            }
          </Stack>
        )
      }
    </Stack>
  )
}