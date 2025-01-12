import getSortedPosts from "./getSortedPosts";

import type { CollectionEntry } from "astro:content";

export const getPostsByGroupCondition = async (
  posts: CollectionEntry<"blog">[],
  condition: (post: CollectionEntry<"blog">) => boolean
): Promise<CollectionEntry<"blog">[]> => {
  const groupPosts = posts.filter(condition);
  if (groupPosts.length === 0) {
    return [];
  }
  const sortedPosts = await getSortedPosts(groupPosts);
  return sortedPosts;
};
