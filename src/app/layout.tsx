import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import './global.css';
import type {Metadata} from "next";
import {Box, ColorSchemeScript, createTheme, DEFAULT_THEME, MantineProvider, rem, Space, Stack} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {NavBar} from "@/parts/navbar";
import {Footer} from "@/parts/footer";

export const metadata: Metadata = {
  title: "上海交通大学 Linux 用户组 软件源镜像服务",
  description: "上海交通大学 Linux 用户组 软件源镜像服务",
};

const theme = createTheme({
  fontSizes: {
    "xs": rem(12),
    "sm": rem(14),
    "md": rem(16),
    "lg": rem(18),
    "xl": rem(24),
    "xxl": rem(36),
    "xxxl": rem(44)
  },
  spacing: {"xxs": rem(4), ...DEFAULT_THEME.spacing, "xxl": rem(48), "xxxl": rem(64)},
  primaryColor: "yellow",
  defaultGradient: {
    from: "yellow",
    to: "orange"
  }
})

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
    <head>
      <ColorSchemeScript defaultColorScheme={"auto"}/>
    </head>
    <body>
    <MantineProvider theme={theme} defaultColorScheme={"auto"}>
      <Notifications/>
      <main>
        <Stack align={"normal"} gap={0} w={"100%"} h={"100%"}>
          <NavBar/>
          <Box style={{flexGrow: 1}}>
            {children}
          </Box>
          <Space h={"xl"}/>
          <Footer/>
        </Stack>
      </main>
    </MantineProvider>
    </body>
    </html>
  );
}
