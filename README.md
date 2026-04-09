# sjtug-mirror-frontend

Modern Frontend for software mirrors with backend as [lug](https://github.com/sjtug/lug).

Built with [Astro](https://astro.build) + [SolidJS](https://www.solidjs.com).

## Development

Run `pnpm install` to prepare dependencies, then `pnpm dev` to start development.

In the case of containerized usage, refer to `Dockerfile` or `docker.nix`. For example:

```sh
# Start frontend with Docker daemon
nix run '.#docker-image.copyToDockerDaemon' && docker run --rm mirror-frontend:latest

# Start frontend with Podman
nix run '.#docker-image.copyToPodman' && podman run --rm mirror-frontend:latest
```

Environment variables:

- `PORT`: Server listen port. Only effective in standalone mode; for `pnpm dev`, use `--port` flag instead.
    - Default: `3000`.
- `HOST`: Server listen host.
    - Default: `0.0.0.0` in container builds, otherwise unspecified.
- `PUBLIC_SITE_NAME`: Which LUG server to display by default. Must match a `name` in `LUG_SERVERS` (e.g. `"Siyuan"`, `"Zhiyuan"`).
    - Default: `"Siyuan"`.
- `NODE_ENV`: Refer to Node.js manual.
- `ASTRO_BUNDLE_NODE_MODULES`: Set to `"1"` to bundle all dependencies into the server output, producing a self-contained `dist/` without `node_modules`.
- `ASTRO_TELEMETRY_DISABLED`: Set to `1` to disable Astro telemetry.

## Maintenance Guideline

- Run `nix flake update`, and commit latest changes to `flake.lock`.
- Edit `.node-version` and `.pnpm-version` to bump Node.js / PNPM.
- Run `pnpm update && pnpm install`, and commit latest changes (if exists any) to `pnpm-lock.yaml`.

## Known Issues

- Astro server does not exit on SIGTERM. Use SIGKILL to terminate process. See <https://github.com/withastro/roadmap/discussions/1302> for discussion.

## License

Apache-2.0. See `LICENSE` for detail.
