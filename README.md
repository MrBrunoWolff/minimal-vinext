# Minimal vinext

A minimal [vinext](https://github.com/cloudflare/vinext) starter (the Next.js App Router API on Vite) with React 19, TypeScript and Cloudflare Workers, built with Bun.

[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

**Live demo:** https://minimal-vinext.mr-brunowolff.workers.dev

## Features

- vinext App Router with React Server Components and a client component example
- Cloudflare Workers target via `@cloudflare/vite-plugin`, deployed with the `cf` CLI
- vinext data cache backed by Workers KV (`VINEXT_KV_CACHE`)
- Next.js 16 `cacheComponents` and `partialPrefetching` enabled in `next.config.ts`
- Strict TypeScript, with Worker binding types generated from `cloudflare.config.ts`
- Oxlint, Oxfmt, Knip and React Doctor for code quality
- GitHub Actions CI running checks, build and `bun audit`
- Bun installs refuse packages published less than 3 days ago (`bunfig.toml`)

## Quick start

### Clone

```sh
git clone https://github.com/MrBrunoWolff/minimal-vinext.git
cd minimal-vinext
bun install
bun run dev
```

## Scripts

| Command                  | Description                                                                   |
| ------------------------ | ----------------------------------------------------------------------------- |
| `bun run dev`            | Start the Vite dev server with vinext                                         |
| `bun run build`          | Production build with Vite                                                    |
| `bun run start`          | Preview the built Worker locally on `$PORT` (default 3000)                    |
| `bun run deploy`         | Build, then deploy the prebuilt output with `cf deploy --prebuilt`            |
| `bun run typecheck`      | Generate vinext types, then type-check with `tsc --noEmit`                    |
| `bun run doctor`         | Run React Doctor on the project                                               |
| `bun run lint`           | Lint with oxlint                                                              |
| `bun run lint:fix`       | Lint with oxlint and apply fixes                                              |
| `bun run fmt`            | Format all files with oxfmt                                                   |
| `bun run fmt:check`      | Check formatting with oxfmt                                                   |
| `bun run check`          | Generate types, then run lint, fmt:check, typecheck:only and knip in parallel |
| `bun run clean`          | Remove `node_modules/.vite`, `.wrangler` and `dist`                           |
| `bun run knip`           | Find unused files, exports and dependencies                                   |
| `bun run typegen`        | Generate vinext types                                                         |
| `bun run typecheck:only` | Type-check with `tsc --noEmit`                                                |
| `bun run audit`          | Fail on high or critical dependency advisories                                |

## Project structure

```
minimal-vinext/
├── .github/workflows/ci.yml  # check, build and audit on push/PR
├── app/
│   ├── layout.tsx            # Root layout and metadata
│   ├── page.tsx              # Home page (server component)
│   └── components/
│       ├── counter.tsx       # Counter (client component)
│       └── rendered-at.tsx   # Client render timestamp
├── docs/agent/               # Browser performance audit setup (Lighthouse, Chrome DevTools MCP)
├── bunfig.toml               # Bun install settings
├── cloudflare.config.ts      # Worker config and bindings
├── knip.json
├── next.config.ts            # Next.js options read by vinext
├── tsconfig.json
├── vite.config.ts            # Vite + vinext + Cloudflare plugin
├── wrangler.jsonc            # Wrangler config (mirrors cloudflare.config.ts)
└── package.json
```

## Deploy to Cloudflare Workers

```sh
bunx cf auth login   # first time only
bun run deploy
```

Set the Worker name in `worker.name` in `cloudflare.config.ts` (and `name` in `wrangler.jsonc`).

## Cloudflare bindings

Bindings are declared under `worker.env` in `cloudflare.config.ts`; dev and build generate their types into `.cloudflare/types/`. The starter defines one KV namespace, `VINEXT_KV_CACHE`, which backs the vinext data cache (`kvDataAdapter` in `vite.config.ts`). `wrangler.jsonc` declares the same binding with its namespace id; keep the two files in sync.

Read bindings from `cloudflare:workers` in any server component or route handler:

```tsx
import { env } from "cloudflare:workers";

export default async function Page() {
  const value = await env.VINEXT_KV_CACHE.get("key");
  return <div>{value}</div>;
}
```

## Dependency overrides

`package.json` overrides Miniflare's `undici` to `7.29.1` to fix [GHSA-rfgv-xxqx-mfg5](https://github.com/advisories/GHSA-rfgv-xxqx-mfg5) and [GHSA-w293-vg96-wgc3](https://github.com/advisories/GHSA-w293-vg96-wgc3) without raising its Node.js requirement. Remove it once Miniflare depends on a patched version.

## License

MIT — see [LICENSE](LICENSE).
