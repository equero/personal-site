import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { siteConfig } from "@/site.config";
import satori from "satori";
import sharp from "sharp";

// Same palette as the site (see --bg, --primary, --secondary, --foreground in global.css)
const colors = {
  bg: "rgb(26, 27, 30)",
  primary: "rgb(16, 185, 129)",
  secondary: "rgb(250, 204, 21)",
  foreground: "rgb(212, 212, 212)",
  muted: "rgb(140, 140, 140)",
};

export interface OgImageData {
  title: string;
  publishDate: string;
  readTime?: number;
  tags?: string[];
}

type Node = { type: string; props: Record<string, unknown> };

const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

// satori can't read woff2, so the woff files come from @fontsource instead of public/fonts.
// Resolved from the project root because the built chunk lives somewhere else.
const requireFromRoot = createRequire(join(process.cwd(), "package.json"));
let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 700 }[]> | undefined;

function loadFonts() {
  fonts ??= Promise.all(
    ([400, 700] as const).map(async (weight) => ({
      name: "JetBrains Mono",
      weight,
      data: await readFile(
        requireFromRoot.resolve(
          `@fontsource/jetbrains-mono/files/jetbrains-mono-latin-${weight}-normal.woff`,
        ),
      ),
    })),
  );
  return fonts;
}

/**
 * Renders the 1200x630 Open Graph image for a post.
 *
 * @param data - Title, date, read time and tags of the post.
 * @returns PNG bytes.
 */
export async function renderOgImage({
  title,
  publishDate,
  readTime,
  tags = [],
}: OgImageData): Promise<Buffer> {
  const date = new Date(publishDate).toLocaleDateString(siteConfig.locale, { dateStyle: "long" });
  const meta = readTime ? `${date} · ${readTime} min read` : date;
  const host = new URL(siteConfig.siteUrl).host;

  const content = h(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexGrow: 1,
      padding: "64px 72px",
    },
    [
      h("div", { display: "flex", fontSize: 30, fontWeight: 700, color: colors.primary }, [
        h("span", {}, `~/${host}`),
        h("span", { color: colors.foreground, marginLeft: 4 }, "_"),
      ]),
      h("div", { display: "flex", flexDirection: "column" }, [
        h(
          "div",
          {
            fontSize: title.length > 60 ? 54 : 64,
            fontWeight: 700,
            lineHeight: 1.15,
            color: colors.secondary,
            maxWidth: 1044,
          },
          title,
        ),
        h("div", { marginTop: 28, fontSize: 28, color: colors.muted }, meta),
      ]),
      h("div", { display: "flex", justifyContent: "space-between", alignItems: "flex-end" }, [
        h(
          "div",
          { display: "flex", flexWrap: "wrap", gap: 16, fontSize: 24, color: colors.primary },
          tags.slice(0, 4).map((tag) => h("span", {}, `#${tag}`)),
        ),
        h("div", { fontSize: 26, color: colors.foreground }, siteConfig.authorName),
      ]),
    ],
  );

  const tree = h(
    "div",
    {
      display: "flex",
      width: 1200,
      height: 630,
      backgroundColor: colors.bg,
      fontFamily: "JetBrains Mono",
      color: colors.foreground,
    },
    [h("div", { width: 12, height: 630, backgroundColor: colors.primary }), content],
  );

  // satori expects React elements; plain { type, props } objects have the same shape.
  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: await loadFonts(),
  });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
