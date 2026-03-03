# Minimal vinext

A minimal [vinext](https://github.com/cloudflare/vinext) starter kit using the App Router, TypeScript, and Cloudflare Workers.

## Features

- **vinext** - Next.js API surface reimplemented on Vite
- **App Router** - File-system routing with React Server Components
- **Cloudflare Workers** - Native deployment target via `vinext deploy`
- **TypeScript** - Strict mode, bundler resolution
- **React 19** - With RSC and client component support
- **Bun** - Fast JavaScript runtime and package manager
- **Oxlint** - Lightning-fast linting (50-100x faster than ESLint)
- **Oxfmt** - Ultra-fast formatting (30x faster than Prettier)

## Quick Start

```bash
# Clone
git clone https://github.com/MrBrunoWolff/minimal-vinext.git my-app
cd my-app

# Install
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `bun run dev`       | Start development server with HMR         |
| `bun run build`     | Production build                          |
| `bun run start`     | Start local production server for testing |
| `bun run deploy`    | Build and deploy to Cloudflare Workers    |
| `bun run lint`      | Lint with oxlint                          |
| `bun run lint:fix`  | Auto-fix lint issues                      |
| `bun run fmt`       | Format with oxfmt                         |
| `bun run fmt:check` | Check formatting                          |
| `bun run check`     | Run lint + format check                   |

## Project Structure

```
minimal-vinext/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (server component)
│   └── components/
│       └── counter.tsx     # Counter example (client component)
├── public/                 # Static assets
├── vite.config.ts          # Vite + vinext + Cloudflare plugin
├── wrangler.jsonc          # Cloudflare Workers configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## Deploy to Cloudflare Workers

```bash
# Authenticate with Cloudflare (first time only)
bunx wrangler login

# Deploy
bun run deploy
```

Update the `name` field in `wrangler.jsonc` to set your Worker's name.

## Cloudflare Bindings

Access D1, KV, R2, and other bindings via `cloudflare:workers` in any server component or route handler:

```ts
import { env } from "cloudflare:workers";

export default async function Page() {
  const result = await env.MY_KV.get("key");
  return <div>{result}</div>;
}
```

Define bindings in `wrangler.jsonc` and run `bunx wrangler types` for TypeScript types.

## Links

- [vinext](https://github.com/cloudflare/vinext)
- [Bun](https://bun.sh/)
- [Oxc (oxlint + oxfmt)](https://oxc.rs/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Vite](https://vitejs.dev/)

## License

MIT
