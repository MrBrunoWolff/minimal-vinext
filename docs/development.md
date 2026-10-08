# Minimal vinext development

[Project overview](../README.md)

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

## Validation and dependencies

Run `bun run check:ci` before a commit or pull request. See [QUALITY.md](../QUALITY.md) for the validation stages. Bun applies the three-day minimum release age in `bunfig.toml`; preserve it when updating dependencies. Verify a frozen install after refreshing the lockfile.

Miniflare currently pins Sharp 0.35.4, which has a high-severity librsvg advisory.
The scoped `miniflare>sharp` override uses the patched 0.35.5 release while
preserving the Cloudflare preview pins and three-day release-age guard. Remove
it when the Miniflare release requests a patched Sharp version.

## Health scan scope

React Doctor scans authored source. `.cloudflare`, `.wrangler` and `dist` are
generated output and are excluded, as are dependencies. The production bundle
warning on React DOM import maps was checked: serialization applies React’s
script-tag escaping after `JSON.stringify`. Generated React property keys and
TanStack history keys use randomness for internal bookkeeping, not credentials;
Clerk’s reported comparison checks a verification-error reason, not a secret.
Source security rules remain enabled.
