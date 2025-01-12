import type { CollectionEntry } from "astro:content";
import slugifyStr from "./slugify";

const slugifyAll = (arr: string[]): string[] => arr.map((str) => slugifyStr(str));

export const getPostsByTag = (
  posts: CollectionEntry<"blog">[],
  tag: string
): CollectionEntry<"blog">[] =>
  posts.filter(
    (post) => post.data.tags !== undefined && slugifyAll(post.data.tags).includes(slugifyStr(tag))
  );

export default getPostsByTag;
