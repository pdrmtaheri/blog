import type { CollectionEntry } from "astro:content";

const postFilter = (post: CollectionEntry<"blog">): boolean => {
  const isPublishTimePassed =
    new Date(post.data.pubDatetime).getTime() <= Date.now();
  return post.data.draft !== true && isPublishTimePassed;
};

export default postFilter;
