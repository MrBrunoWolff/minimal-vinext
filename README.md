# Minimal vinext

A [vinext](https://github.com/cloudflare/vinext) starter for React apps using the Next.js App Router API on Vite and Cloudflare Workers.

[Visit the web app](https://minimal-vinext.mr-brunowolff.workers.dev)

[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## Quick start

Use the Bun version declared in [package.json](package.json).

```sh
git clone https://github.com/MrBrunoWolff/minimal-vinext.git
cd minimal-vinext
bun install --frozen-lockfile
bun run dev
```

Open the local URL printed by the development server.

## Features

- Server and client component examples with strict TypeScript.
- Workers deployment and a KV-backed data cache.
- Type generation, linting, formatting and unused-code checks.

## Scripts

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `bun run dev`      | Start the Vite development server               |
| `bun run build`    | Build the production Worker                     |
| `bun run start`    | Preview the built Worker                        |
| `bun run check`    | Generate types and run code checks              |
| `bun run doctor`   | Run React Doctor                                |
| `bun run audit`    | Audit dependencies                              |
| `bun run deploy`   | Build and deploy with cf prebuilt               |
| `bun run check:ci` | Run the complete repository validation contract |

## Development

See the [development guide](docs/development.md) for project structure, implementation details and maintenance. The complete command list is in [package.json](package.json).

## License

MIT — see [LICENSE](LICENSE).
