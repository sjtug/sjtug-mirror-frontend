{
  description = "A Nix-flake-based Node.js development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };
    pre-commit-hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    importPnpmLock = {
      url = "git+https://tangled.org/scrumplex.net/importPnpmLock.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    nix2container = {
      url = "github:nlewo/nix2container";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        inputs.treefmt-nix.flakeModule
        inputs.pre-commit-hooks.flakeModule
      ];

      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];

      perSystem =
        {
          config,
          pkgs,
          lib,
          system,
          ...
        }:
        let
          attrs = lib.importJSON ./package.json;
          inherit (attrs) name version;
          nodeVersion = lib.importJSON ./.node-version;
          pnpmVersion = lib.importJSON ./.pnpm-version;
        in
        {
          _module.args.pkgs = import inputs.nixpkgs {
            inherit system;
            overlays = [
              inputs.importPnpmLock.overlays.default
              (_final: prev: rec {
                nodejs = prev."nodejs_${toString nodeVersion}";

                pnpm = prev."pnpm_${toString pnpmVersion}".override { inherit nodejs; };
              })
            ];
          };

          # https://flake.parts/options/treefmt-nix.html
          # Example: https://github.com/nix-community/buildbot-nix/blob/main/nix/treefmt/flake-module.nix
          treefmt = {
            projectRootFile = "flake.nix";
            settings.global.excludes = [ ];

            programs = {
              autocorrect.enable = true;
              nixfmt.enable = true;
            };
          };

          # https://flake.parts/options/git-hooks-nix.html
          # Example: https://github.com/cachix/git-hooks.nix/blob/master/template/flake.nix
          pre-commit.settings.package = pkgs.prek;
          pre-commit.settings.configPath = ".pre-commit-config.flake.yaml";
          pre-commit.settings.hooks = {
            commitizen.enable = true;
            eclint.enable = true;
            eslint.enable = true;
            treefmt.enable = true;
          };

          devShells.default = pkgs.mkShell {
            inputsFrom = [
              config.treefmt.build.devShell
              config.pre-commit.devShell
            ];

            shellHook = ''
              echo 1>&2 "Welcome to the development shell!"
            '';

            packages = with pkgs; [
              nodejs
              pnpm
            ];
          };

          packages.frontend = pkgs.callPackage ./default.nix { inherit name version; };
          packages.docker-image = pkgs.callPackage ./docker.nix {
            inherit (config.packages) frontend;
            inherit (inputs.nix2container.packages.${system}) nix2container;
          };
        };
    };
}
