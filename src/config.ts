export type SiteName = "Siyuan" | "Zhiyuan";

const SITE_NAMES: SiteName[] = ["Siyuan", "Zhiyuan"];

export const CURRENT_SITE: SiteName =
  SITE_NAMES.includes(import.meta.env.PUBLIC_SITE_NAME as SiteName)
    ? (import.meta.env.PUBLIC_SITE_NAME as SiteName)
    : "Siyuan";

export interface LugServer {
  name: SiteName;
  url: string;
}

export const LUG_SERVERS: LugServer[] = [
  { name: "Siyuan", url: "https://mirror.sjtu.edu.cn/lug/v1/manager/summary" },
  {
    name: "Zhiyuan",
    url: "https://mirrors.sjtug.sjtu.edu.cn/lug/v1/manager/summary",
  },
];

export const HIDDEN = ["sjtug-internal"];

export const NEWS_SERVER =
  "https://sjtug-portal-1251836446.file.myqcloud.com/tags/mirror-news/index.xml";

export const HELP_SERVER =
  "https://sjtug-portal-1251836446.file.myqcloud.com/tags/mirror-help/index.xml";

export const MIRRORZ_HELP_URL = "https://help.mirrors.cernet.edu.cn/";
export const MIRRORZ_HELP: Record<string, string> = {
  alpine: "alpine",
  anaconda: "anaconda",
  anthon: "anthon",
  archlinux: "archlinux",
  archlinuxarm: "archlinuxarm",
  "archlinux-cn": "archlinuxcn",
  armbian: "armbian",
  bioconductor: "bioconductor",
  blackarch: "blackarch",
  centos: "centos",
  cpan: "CPAN",
  CPAN: "CPAN",
  cran: "CRAN",
  CRAN: "CRAN",
  "crates.io": "crates.io-index",
  ctan: "CTAN",
  CTAN: "CTAN",
  cygwin: "cygwin",
  "dart-pub": "dart-pub",
  debian: "debian",
  "debian-cd": "debian-cd",
  "debian-cdimage": "debian-cdimage",
  "debian-security": "debian-security",
  "docker-ce": "docker-ce",
  "emacs-elpa": "elpa",
  fedora: "fedora",
  "fedora/epel": "epel",
  "fedora/linux": "fedora",
  "fedora-ostree": "fedora-ostree",
  flathub: "flathub",
  flutter_infra: "flutter_infra",
  "git/flutter-sdk.git": "flutter-sdk.git",
  gentoo: "gentoo",
  ghcup: "ghcup",
  gnu: "gnu",
  guix: "guix",
  "git/guix.git": "guix.git",
  "homebrew-bottles": "homebrew-bottles",
  immortalwrt: "immortalwrt",
  julia: "julia",
  "julia-releases": "julia-releases",
  kali: "kali",
  linuxliteos: "linuxliteos",
  linuxmint: "linuxmint",
  mageia: "mageia",
  manjaro: "manjaro",
  manjarostable: "manjaro",
  mongodb: "mongodb",
  msys2: "msys2",
  "nix-channels/store": "nix-channels",
  "nodejs-release": "nodejs-release",
  OpenBSD: "OpenBSD",
  opensuse: "opensuse",
  openwrt: "openwrt",
  packman: "packman",
  "pypi-packages": "pypi",
  "pypi/web/simple": "pypi",
  qt: "qt",
  raspberrypi: "raspberrypi",
  "raspberry-pi-os-images": "raspberry-pi-os-images",
  raspbian: "raspbian",
  "registry.k8s.io": "kubernetes",
  rocky: "rocky",
  ros: "ros",
  rpmfusion: "rpmfusion",
  "rust-static": "rustup",
  scientific: "scientificlinux",
  termux: "termux",
  ubuntu: "ubuntu",
  "ubuntu-cloud-images": "ubuntu-cloud-images",
  "ubuntu-ports": "ubuntu-ports",
  voidlinux: "voidlinux",
  // Git repos
  "git/crates.io-index": "crates.io-index.git",
  "git/linux.git": "linux.git",
  "git/llvm-project.git": "llvm-project.git",
  "git/ohmyzsh.git": "ohmyzsh.git",
  "git/opam-repository.git": "opam-repository.git",
  "git/qemu.git": "qemu.git",
};
