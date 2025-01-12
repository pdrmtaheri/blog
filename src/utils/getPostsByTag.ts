import type { CollectionEntry } from "astro:content";
import slugifyAll from "./slugify";
import getSortedPosts from "./getSortedPosts";

export const getPostsByTag = async (
  posts: CollectionEntry<"blog">[],
  tag: string,
): Promise<CollectionEntry<"blog">[]> => {
  return getSortedPosts(
    posts.filter((post) =>
      post.data.tags.map((t) => slugifyAll(t)).includes(tag),
    ),
  );
};
