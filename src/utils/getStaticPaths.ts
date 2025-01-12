import { getCollection, type CollectionEntry } from "astro:content";
import { getPostsWithRT } from "./getPostsWithRT";
import getSortedPosts from "./getSortedPosts";

export async function getStaticPaths(): Promise<
  {
    params: { slug: string };
    props: {
      post: CollectionEntry<"blog">;
      sortedPosts: CollectionEntry<"blog">[];
    };
  }[]
> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const postsWithRT = await getPostsWithRT(posts);
  const allPosts = await getCollection("blog");
  const sortedPosts = await getSortedPosts(allPosts);

  const postResult = postsWithRT.map((post: CollectionEntry<"blog">) => ({
    params: { slug: post.slug },
    props: { post, sortedPosts },
  }));

  return postResult;
}
