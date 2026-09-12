import { createFileRoute, notFound } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";

// Catches every URL that doesn't match a real route (typos, removed pages,
// old links, bots probing random paths, etc).
//
// Without this, TanStack Start falls back to the root `notFoundComponent`
// but still replies with HTTP 200 — Google Search Console flags that as a
// "Soft 404" (a page that looks like an error but claims to be OK), which
// stops it (and, worse, real pages it gets confused with) from being
// indexed. Setting the status explicitly here fixes that.
//
// `setResponseStatus` is server-only, so it's wrapped in createIsomorphicFn
// with a no-op client branch — otherwise it can't be bundled for the client.
const markNotFoundStatus = createIsomorphicFn()
  .server(() => {
    setResponseStatus(404);
  })
  .client(() => {});

export const Route = createFileRoute("/$")({
  loader: () => {
    markNotFoundStatus();
    throw notFound();
  },
});
