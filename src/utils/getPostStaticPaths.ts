import { type CollectionEntry, getCollection } from "astro:content";

import getSortedPosts from "./getSortedPosts";
import { getPostsWithRT } from "./getPostsWithRT";
import postFilter from "./postFilter";

interface IStaticPath {
  params: { slug: string };
  props: {
    post: CollectionEntry<"blog">;
    sortedPosts: CollectionEntry<"blog">[];
  };
}

export const getStaticPaths = async (): Promise<IStaticPath[]> => {
  const posts = await getCollection("blog");
  const filteredPosts = posts.filter(postFilter);
  const postsWithRT = await getPostsWithRT(filteredPosts);
  const sortedPosts = await getSortedPosts(filteredPosts);

  return postsWithRT.map((post) => ({
    params: { slug: post.slug },
    props: { post, sortedPosts },
  }));
};
