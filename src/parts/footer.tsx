import {Anchor, Box, Center, Container, Group, Image, Stack, Text} from "@mantine/core";
import NextImage from "next/image";
import classes from "@/app/global.module.css";
import {IconMail, IconMessageDots} from "@tabler/icons-react";
import imgSjtug from "@/assets/sjtug.svg"
import {CURRENT_SITE} from "@/consts";

export const Footer = () => (
  <Stack bg={"var(--mantine-color-footer)"} w={"100%"} py={"xxxl"}>
    <Container className={classes.container}>
      <Group align="center" justify={"center"} gap={"xl"}>
        <Group justify={"center"} style={{flex: 3, flexWrap: "nowrap"}} miw={"min(100%, 30em)"}>
          <Box style={{flex: 1}} maw={"20em"} mb={"auto"}>
            <Image component={NextImage} alt={"SJTUG Logo"} src={imgSjtug} sizes="100vw"
                   w={"100%"} h={"auto"}/>
          </Box>
          <Stack className={classes.textNormal} gap={"xs"} style={{flex: 3}} miw={"min(100%, 15em)"}>
            <Text fw={700} inherit>SJTUG {CURRENT_SITE} Mirror</Text>
            <Text inherit>由 上海交通大学 Linux 用户组 (SJTUG) 维护</Text>
            <Text inherit>沪交 ICP 备 20180085</Text>
          </Stack>
        </Group>
        <Center style={{flex: 1}} miw={"min(100%, 10em)"}>
          <Stack className={classes.textNormal} gap={"xs"}>
            <Anchor href={"https://github.com/sjtug/mirror-requests"} target="_blank" c={"var(--text-color)"} inherit>
              <Group align={"center"} gap={0} wrap={"nowrap"}>
                <IconMessageDots size={24} stroke={1.5} style={{flexShrink: 0}}/>
                反馈 Bug / 提交新镜像请求
              </Group>
            </Anchor>
            <Anchor href={"mailto:sjtug-mirror-maintainers@googlegroups.com"} c={"var(--text-color)"} inherit>
              <Group align={"center"} gap={0} wrap={"nowrap"}>
                <IconMail size={24} stroke={1.5} style={{flexShrink: 0}}/>
                邮件联系镜像源管理员
              </Group>
            </Anchor>
          </Stack>
        </Center>

      </Group>
    </Container>
  </Stack>
);