import { createFileRoute, notFound } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { BlogShell } from "@/components/site/BlogShell";
import { POSTS } from "@/content/posts";

// setResponseStatus is server-only; createIsomorphicFn keeps it out of the
// client bundle while still calling it during SSR.
const markNotFoundStatus = createIsomorphicFn()
  .server(() => {
    setResponseStatus(404);
  })
  .client(() => {});

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS[params.slug];
    if (!post) {
      // Reply with a real 404 instead of a 200 "not found" page — the
      // latter is what Google Search Console flags as a Soft 404.
      markNotFoundStatus();
      throw notFound();
    }
    return { title: post.title, description: post.metaDescription, slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article unavailable | FreelanceRate" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.title} | FreelanceRate` },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${loaderData.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${loaderData.slug}` }],
    };
  },
  component: Post,
});

function Post() {
  const { slug } = Route.useParams();
  const post = POSTS[slug];
  if (!post) return null;
  return (
    <BlogShell
      slug={post.slug}
      title={post.title}
      deck={post.deck}
      category={post.category}
      readMins={post.readMins}
      sections={post.sections}
      related={post.related}
    />
  );
}
