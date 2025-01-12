import type { CollectionEntry } from "astro:content";
import Datetime from "./Datetime";
import type { ReactElement } from "react";

interface Props {
  href: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({
  href,
  frontmatter,
  secHeading = true,
}: Props): ReactElement {
  const { title, pubDatetime, modDatetime, description, readingTime } =
    frontmatter;
  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 className="text-lg font-medium decoration-dashed hover:underline">
            {title}
          </h2>
        ) : (
          <h3 className="text-lg font-medium decoration-dashed hover:underline">
            {title}
          </h3>
        )}
      </a>
      <Datetime
        pubDatetime={pubDatetime}
        modDatetime={modDatetime}
        readingTime={readingTime}
      />
      <p>{description}</p>
    </li>
  );
}
