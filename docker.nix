{
  lib,
  nix2container,
  dockerTools,
  nodejs-slim,
  frontend,
  port ? 3000,
  site ? null,
}:
let
  # Nest all layers so that prior layers are dependencies of later layers.
  # This way, we should avoid redundant dependencies.
  foldImageLayers =
    let
      mergeToLayer =
        priorLayers: component:
        assert builtins.isList priorLayers;
        assert builtins.isAttrs component;
        let
          layer = nix2container.buildLayer (
            component
            // {
              layers = priorLayers;
            }
          );
        in
        priorLayers ++ [ layer ];
    in
    layers: lib.foldl mergeToLayer [ ] layers;
in
nix2container.buildImage {
  name = "mirror-frontend";
  tag = "latest";

  copyToRoot = [
    dockerTools.caCertificates
  ];

  layers =
    let
      layerDefs = [
        { deps = [ frontend ]; }
        { deps = [ nodejs-slim ]; }
      ];
    in
    foldImageLayers layerDefs;

  config = {
    Cmd = [
      "${lib.getExe nodejs-slim}"
      "${frontend}/dist/server/entry.mjs"
    ];
    Env = [
      "NODE_ENV=production"
      "HOST=0.0.0.0"
      "PORT=${toString port}"
    ]
    ++ lib.optional (site != null) "PUBLIC_SITE_NAME=${site}";
    ExposedPorts = {
      "${toString port}/tcp" = { };
    };
  };

}
