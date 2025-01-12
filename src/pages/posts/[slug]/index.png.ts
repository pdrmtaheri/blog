import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@utils/generateOgImages";
import slugifyStr from "@utils/slugify";

export async function getStaticPaths(): Promise<
  {
    params: { slug: string };
    props: CollectionEntry<"blog">;
  }[]
> {
  const posts = await getCollection("blog").then((p) =>
    p.filter(({ data }) => !data.draft && !data.ogImage),
  );

  return posts.map((post) => ({
    params: { slug: slugifyStr(post.data.title) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const imageBuffer = await generateOgImageForPost(
    props as CollectionEntry<"blog">,
  );
  return new Response(imageBuffer, {
    headers: { "Content-Type": "image/png" },
  });
};

export const prerender = true;
