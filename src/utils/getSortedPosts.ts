import { getPostsWithRT } from "./getPostsWithRT";
import postFilter from "./postFilter";

import type { CollectionEntry } from "astro:content";

const getSortedPosts = async (
  posts: CollectionEntry<"blog">[]
): Promise<CollectionEntry<"blog">[]> => {
  const postsWithRT = await getPostsWithRT(posts);
  return postsWithRT
    .filter(postFilter)
    .sort(
      (a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
        Math.floor(new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000) -
        Math.floor(new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000)
    );
};

export default getSortedPosts;
