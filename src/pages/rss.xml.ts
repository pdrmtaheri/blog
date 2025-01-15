import rss from "@astrojs/rss";
import { SITE } from "@config";
import getSortedPosts from "@utils/getSortedPosts";
import { getCollection } from "astro:content";

export async function GET(): Promise<Response> {
  const posts = await getCollection("blog");
  const sortedPosts = await getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, slug }) => ({
      link: `posts/${slug}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
    customData: `<atom:link href="${SITE.website}rss.xml" rel="self" type="application/rss+xml" />`,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
  });
}
