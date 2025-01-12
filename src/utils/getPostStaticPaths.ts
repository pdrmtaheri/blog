import { type CollectionEntry, getCollection } from "astro:content";
import postFilter from "./postFilter";
import getSortedPosts from "./getSortedPosts";

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
  const sortedPosts = await getSortedPosts(filteredPosts);

  return filteredPosts.map(post => ({
    params: { slug: post.slug },
    props: { post, sortedPosts },
  }));
}; 