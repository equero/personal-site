import { renderOgImage } from "@/utils/og-image";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

describe("renderOgImage", () => {
  it("should render a 1200x630 PNG", async () => {
    const png = await renderOgImage({
      title: "A post title",
      publishDate: "2026-10-29T10:00:00.000Z",
      readTime: 9,
      tags: ["astro", "opinion"],
    });

    const { format, width, height } = await sharp(png).metadata();
    expect(format).toBe("png");
    expect(width).toBe(1200);
    expect(height).toBe(630);
  });

  it("should render a post with a long title and no read time or tags", async () => {
    const png = await renderOgImage({
      title: "A very long title that has to wrap over several lines in the share image ".repeat(2),
      publishDate: "2026-10-29T10:00:00.000Z",
    });

    const { width, height } = await sharp(png).metadata();
    expect(width).toBe(1200);
    expect(height).toBe(630);
  });
});
