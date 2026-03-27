{
  lib,
  stdenv,
  importPnpmLock,
  iplConfigHook,
  pnpm,
  nodejs,
  name ? "mirror-frontend",
  version ? "0-unstable",
}:
stdenv.mkDerivation (finalAttrs: {
  pname = name;
  inherit version;

  src = lib.fileset.toSource {
    root = ./.;
    fileset = lib.fileset.intersection (lib.fileset.fromSource (lib.sources.cleanSource ./.)) (
      lib.fileset.unions [
        ./astro.config.mjs
        ./public
        ./src
        ./eslint.config.mjs
        ./LICENSE
        ./package.json
        ./pnpm-lock.yaml
        ./postcss.config.cjs
        ./README.md
        ./tsconfig.json
      ]
    );
  };

  nativeBuildInputs = [
    iplConfigHook
    pnpm
    nodejs
  ];

  mitmCache = importPnpmLock {
    inherit (finalAttrs) pname version;

    lockFile = ./pnpm-lock.yaml;

    manualEntries = { };
  };

  buildPhase = ''
    pnpm rebuild --pending --reporter append-only
    pnpm run build
  '';

  env = {
    ASTRO_TELEMETRY_DISABLED = "1";
    ASTRO_BUNDLE_NODE_MODULES = "1";
  };

  installPhase = ''
    runHook preInstall

    mkdir -p $out
    cp -r dist $out/

    runHook postInstall
  '';
})
