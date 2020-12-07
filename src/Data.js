export const INTRO = {
  ubuntu: "Ubuntu 软件源",
};

// For these repos, Siyuan will take precedence to Zhiyuan, and won't be shown.
export const BLOCKED_IN_ZHIYUAN = [
  "centos",
  "debian",
  "debian-cd",
  "debian-security",
  "deepin",
  "deepin-cd",
  "docker-ce",
  "fedora-secondary",
  "fedora",
  "linuxmint",
  "linuxmint-cd",
  "mageia",
  "opensuse",
  "openvz",
  "remi",
  "scientific",
  "ubuntu",
  "ubuntu-cd",
  "rust-static",
  "homebrew-bottles",
];

// These are legacy reverse proxy repos on Zhiyuan mirror.
export const REVERSE_PROXY = [
  "docker-registry",
  "npm-registry",
  "nodejs-release",
  "flutter_infra",
  "dart_packages",
  "maven-central",
  "crates.io",
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

export const HIDDEN = ["crates.io", "opam-cache"];
