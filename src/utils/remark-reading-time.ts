import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import type { Root } from "mdast";
import type { VFile } from "vfile";

export function remarkReadingTime(): (_tree: Root, _file: VFile) => void {
  return function (_tree: Root, _file: VFile): void {
    const textOnPage = toString(_tree);
    const readingTime = getReadingTime(textOnPage);
    // @ts-expect-error: astro property exists on data
    _file.data.astro.frontmatter.minutesRead = readingTime.text;
  };
}
