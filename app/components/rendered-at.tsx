"use client";

import { useSyncExternalStore } from "react";

const PLACEHOLDER = "…";

// Capture the client render time once, lazily, the first time the snapshot
// is read in the browser. Returning a stable cached string keeps
// useSyncExternalStore's getSnapshot referentially stable across renders.
let clientSnapshot: string | null = null;

function subscribe() {
  // The value is fixed at first client read and never changes afterwards,
  // so there is nothing to subscribe to. Return a no-op unsubscribe.
  return () => {};
}

function getSnapshot() {
  clientSnapshot ??= new Date().toISOString();
  return clientSnapshot;
}

function getServerSnapshot() {
  return PLACEHOLDER;
}

export function RenderedAt() {
  const renderedAt = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return <time>{renderedAt}</time>;
}
