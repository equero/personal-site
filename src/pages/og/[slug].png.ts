import { renderOgImage } from "@/utils/og-image";
import { getAllPosts } from "@/utils/post";
import type { APIRoute, GetStaticPaths } from "astro";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts(false);

  return posts.map(({ data }) => ({
    params: { slug: data.slug },
    props: {
      title: data.title,
      publishDate: data.publishDate,
      readTime: data.readTime,
      tags: data.tags,
    },
  }));
};

/**
 * Astro GET endpoint that renders one Open Graph image per post at build time.
 *
 * @returns A PNG response for the `/og/<slug>.png` route.
 */
export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props as Parameters<typeof renderOgImage>[0]);

  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
