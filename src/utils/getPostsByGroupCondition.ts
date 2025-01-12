import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";

export const getPostsByGroupCondition = async (
  posts: CollectionEntry<"blog">[],
  condition: (post: CollectionEntry<"blog">) => boolean,
): Promise<CollectionEntry<"blog">[]> => {
  const groupPosts = posts.filter(condition);
  if (groupPosts.length === 0) {
    return [];
  }
  const sortedPosts = await getSortedPosts(groupPosts);
  return sortedPosts;
};
