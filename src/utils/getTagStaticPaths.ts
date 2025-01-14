import { getCollection } from "astro:content";

import { getPostsWithRT } from "./getPostsWithRT";
import getSortedPosts from "./getSortedPosts";
import getUniqueTags from "./getUniqueTags";
import slugifyStr from "./slugify";

import type { PaginateFunction } from "astro";

interface ITagStaticPathParams {
  paginate: PaginateFunction;
}

type StaticPathReturn = ReturnType<PaginateFunction>;

export const getStaticPaths = async ({
  paginate,
}: ITagStaticPathParams): Promise<StaticPathReturn> => {
  const posts = await getCollection("blog", ({ data }) => data.draft === false);
  const postsWithRT = await getPostsWithRT(posts);
  const allPosts = await getCollection("blog");
  const sortedPosts = await getSortedPosts(allPosts);
  const tags = getUniqueTags(allPosts);

  return tags.flatMap(({ tag }) => {
    const tagPosts = postsWithRT.filter((post) => {
      const postTags = post.data.tags;
      if (!Array.isArray(postTags)) return false;
      return postTags.some((t) => slugifyStr(t) === tag);
    });

    return paginate(tagPosts, {
      params: { tag },
      pageSize: 10,
      props: { tag, tagName: tag, sortedPosts },
    });
  });
};
