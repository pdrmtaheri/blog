import type { CollectionEntry } from "astro:content";

type GroupFunction<T, K extends string | number> = (_value: T) => K;

export const getPostsByGroupCondition = <GroupKey extends string | number>(
  posts: CollectionEntry<"blog">[],
  groupFunction: GroupFunction<CollectionEntry<"blog">, GroupKey>,
): Record<GroupKey, CollectionEntry<"blog">[]> => {
  return posts.reduce(
    (acc: Record<GroupKey, CollectionEntry<"blog">[]>, currentPost) => {
      const groupKey = groupFunction(currentPost);
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(currentPost);
      return acc;
    },
    {} as Record<GroupKey, CollectionEntry<"blog">[]>,
  );
};
