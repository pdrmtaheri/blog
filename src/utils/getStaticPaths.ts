import { getCollection } from "astro:content";

import postFilter from "./postFilter";

import type { PaginateFunction } from "astro";

interface IStaticPathParams {
  paginate: PaginateFunction;
  filterPosts?: boolean;
}

type StaticPathReturn = ReturnType<PaginateFunction>;

export const getStaticPaths = async ({
  paginate,
  filterPosts = true,
}: IStaticPathParams): Promise<StaticPathReturn> => {
  const allPosts = await getCollection("blog");
  const filteredPosts = filterPosts === true ? allPosts.filter(postFilter) : allPosts;

  return paginate(filteredPosts, {
    pageSize: 10,
  });
};
