import type { CollectionEntry } from "astro:content";
import slugifyAll from "./slugify";

export const getPostsByTag = (
  posts: CollectionEntry<"blog">[],
  tag: string,
): CollectionEntry<"blog">[] => {
  const filteredPosts = posts.filter(
    (post) =>
      post.data.tags !== undefined && slugifyAll(post.data.tags).includes(tag),
  );
  return filteredPosts;
};
