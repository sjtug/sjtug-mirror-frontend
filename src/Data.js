export const INTRO = {
  ubuntu: "Ubuntu 软件源",
};

// For these repos, Siyuan will take precedence to Zhiyuan, and won't be shown.
export const BLOCKED_IN_ZHIYUAN = [
  // "centos",
  // "debian",
  // "debian-cd",
  // "debian-security",
  // "deepin",
  // "deepin-cd",
  // "docker-ce",
  // "fedora-secondary",
  // "fedora",
  // "linuxmint",
  // "linuxmint-cd",
  // "mageia",
  // "opensuse",
  // "openvz",
  // "remi",
  // "scientific",
  // "ubuntu",
  // "ubuntu-cd",
  // "rust-static",
  // "homebrew-bottles",
];

export const MIRRORZ_HELP_URL = "https://help.mirrors.cernet.edu.cn/";

// sjtug name => mirrorz cname
export const MIRRORZ_HELP = {
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

// These are legacy reverse proxy repos on Zhiyuan mirror.
export const REVERSE_PROXY = [
  "docker-registry",
  "npm-registry",
  "nodejs-release",
  "maven-central",
  "google-fonts",
  "opam-cache",
  "pypi/web/simple",
  "k8s.gcr.io",
];

// These are mirror-intel based repos on Siyuan mirror.
export const MIRROR_INTEL = [
  "static.crates.io",
  "pypi-packages",
  "homebrew-bottles",
  "rust-static",
  "fedora-ostree",
  "fedora-iot",
  "flathub",
];

export const HIDDEN = [];
