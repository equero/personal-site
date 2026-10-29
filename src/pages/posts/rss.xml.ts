import { siteConfig } from "@/site.config";
import { getLatestPosts } from "@/utils/post";
import rss from "@astrojs/rss";

/**
 * Feed readers don't resolve root-relative URLs, so point them at the site.
 *
 * @param html - Rendered post HTML.
 * @returns The same HTML with `href="/..."` and `src="/..."` made absolute.
 */
function toAbsoluteUrls(html: string): string {
  const origin = new URL(siteConfig.siteUrl).origin;
  return html.replace(/\b(href|src)="\/(?!\/)/g, `$1="${origin}/`);
}

/**
 * Astro GET endpoint that generates the RSS feed for the latest blog posts.
 *
 * Fetches the 20 most recent published posts and maps them to RSS items,
 * with the full rendered post as content and tags as categories.
 *
 * @returns An RSS response object for the `/posts/rss.xml` route.
 */
export async function GET() {
  const latestPosts = await getLatestPosts(20);

  return rss({
    title: `${siteConfig.siteTitle} - Posts`,
    description: `Latest blog posts from ${siteConfig.authorName}, ${siteConfig.jobTitle}. Insights on web development, programming, and technology.`,
    site: siteConfig.siteUrl,
    items: latestPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      content: post.rendered?.html ? toAbsoluteUrls(post.rendered.html) : undefined,
      pubDate: new Date(post.data.publishDate),
      link: `/posts/${post.data.slug}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>${siteConfig.locale.toLowerCase()}</language>`,
  });
}
