import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogShell } from "@/components/site/BlogShell";
import { POSTS } from "@/content/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS[params.slug];
    if (!post) throw notFound();
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
