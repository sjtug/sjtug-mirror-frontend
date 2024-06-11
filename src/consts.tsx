export const CURRENT_SITE = process.env.NEXT_PUBLIC_SITE_NAME??"Siyuan"

export type LugServer = {
  name: string,
  url: string
}

export const LUG_SERVERS: LugServer[] = [
  {name: "Siyuan", url: "https://mirror.sjtu.edu.cn/lug/v1/manager/summary"},
  {name: "Zhiyuan", url: "https://mirrors.sjtug.sjtu.edu.cn/lug/v1/manager/summary"},
]
export const HIDDEN = [
  "sjtug-internal"
]
export const NEWS_SERVER = "https://sjtug-portal-1251836446.file.myqcloud.com/tags/mirror-news/index.xml"
export const HELP_SERVER = "https://sjtug-portal-1251836446.file.myqcloud.com/tags/mirror-help/index.xml"

export const MIRRORZ_HELP_URL = "https://help.mirrors.cernet.edu.cn/";
export const MIRRORZ_HELP: Record<string, string> = {
  cpan: "CPAN",
  ctan: "CTAN",
  cygwin: "cygwin",
  "fedora/epel": "epel",
  "git/linux.git": "linux.git",
  "git/llvm-project.git": "llvm-project.git",
  "git/qemu.git": "qemu.git",
  linuxmint: "linuxmint",
  manjaro: "manjaro",
  OpenBSD: "OpenBSD",
  opensuse: "opensuse",
  openwrt: "openwrt",
  rpmfusion: "rpmfusion",
};
