import { generateOgImageForPost } from "@utils/generateOgImages";
import { getCollection } from "astro:content";

import type { APIRoute } from "astro";

interface IStaticPath {
  params: { slug: string };
}

export const getStaticPaths = async (): Promise<IStaticPath[]> => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
};

export const GET: APIRoute = async ({ params }) => {
  const posts = await getCollection("blog");
  const matchingPost = posts.find((post) => post.slug === params.slug);

  if (matchingPost === undefined) {
    return new Response("Post not found", { status: 404 });
  }

  const { data } = matchingPost;
  const isDraft = data.draft === true;
  const isScheduled = new Date(data.pubDatetime).getTime() > Date.now();

  if (isDraft || isScheduled) {
    return new Response("Post not available", { status: 403 });
  }

  const imageBuffer = await generateOgImageForPost(matchingPost);
  return new Response(imageBuffer, {
    headers: { "Content-Type": "image/png" },
  });
};
