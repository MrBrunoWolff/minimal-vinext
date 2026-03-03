import { Counter } from "./components/counter";

export default function HomePage() {
  return (
    <main>
      <h1>minimal-vinext</h1>
      <p>Server-rendered by vinext on Cloudflare Workers.</p>
      <p>
        Rendered at: <time>{new Date().toISOString()}</time>
      </p>
      <Counter />
    </main>
  );
}
