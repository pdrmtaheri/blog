import { getCollection, type CollectionEntry } from "astro:content";
import type { GetStaticPathsOptions, Page } from "astro";
import { SITE } from "@config";
import getUniqueTags from "./getUniqueTags";
import { getPostsByTag } from "./getPostsByTag";

export async function getStaticPaths({
  paginate,
}: GetStaticPathsOptions): Promise<
  {
    params: { tag: string; page?: string };
    props: {
      page: Page<CollectionEntry<"blog">>;
      tagName: string;
      tag: string;
    };
  }[]
> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const tags = getUniqueTags(posts);
  const paths = [];

  for (const { tag: tagValue, tagName: tagNameValue } of tags) {
    const tagPosts = await getPostsByTag(posts, tagValue);
    const paginatedPosts = paginate(tagPosts, {
      params: { tag: tagValue },
      props: { tagName: tagNameValue, tag: tagValue },
      pageSize: SITE.postPerPage,
    });
    paths.push(...paginatedPosts);
  }

  return paths;
}
