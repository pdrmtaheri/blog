import slugifyStr from "./slugify";
import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

interface ITag {
  tag: string;
  count: number;
}

const getUniqueTags = (posts: CollectionEntry<"blog">[]): ITag[] => {
  const tags: ITag[] = posts
    .filter(postFilter)
    .flatMap((post) => post.data.tags)
    .map((tag) => ({ tag: slugifyStr(tag), count: 1 }))
    .filter(
      (value, index, self) =>
        self.findIndex((tag) => tag.tag === value.tag) === index,
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

export default getUniqueTags;
