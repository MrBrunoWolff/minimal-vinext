import { Counter } from "./components/counter";
import { RenderedAt } from "./components/rendered-at";

export default function HomePage() {
  return (
    <main>
      <h1>minimal-vinext</h1>
      <p>Server-rendered by vinext on Cloudflare Workers.</p>
      <p>
        Rendered at: <RenderedAt />
      </p>
      <Counter />
    </main>
  );
}
