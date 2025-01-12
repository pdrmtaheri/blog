import type { CollectionEntry } from "astro:content";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import type { Root } from "mdast";
import type { VFile } from "vfile";

export const remarkReadingTime = (): ((_tree: Root, _file: VFile) => void) => {
  return (_tree: Root, _file: VFile) => {
    const textOnPage = toString(_tree);
    const readingTime = getReadingTime(textOnPage);
    // @ts-expect-error: Astro adds custom data properties to VFile
    _file.data.astro.frontmatter.readingTime = readingTime.text;
  };
};

export const getPostsWithRT = async (
  posts: CollectionEntry<"blog">[],
): Promise<CollectionEntry<"blog">[]> => {
  const postsWithRT = await Promise.all(
    posts.map(async (post) => {
      const { remarkPluginFrontmatter } = await post.render();
      return {
        ...post,
        data: {
          ...post.data,
          readingTime: remarkPluginFrontmatter.readingTime,
        },
      };
    }),
  );
  return postsWithRT;
};
