import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "minimal-vinext",
  description: "Minimal vinext starter kit with App Router and Cloudflare Workers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
