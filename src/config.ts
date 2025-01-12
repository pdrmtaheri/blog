import type { ISite, SocialObjects } from "./types";
import type { GiscusProps } from "@giscus/react";

export const SITE: ISite = {
  website: "https://pedram.blog/",
  author: "Pedram Taheri",
  profile: "https://satnaing.dev/",
  desc: "Pedram's blog: Thoughts on Building with Software",
  title: "Pedram's Blog",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  editPost: {
    url: "https://github.com/pdrmtaheri/blog/edit/main/src/content/blog",
    text: "Suggest Changes",
    appendFilePath: true,
  },
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/pdrmtaheri",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/pdrmtaheri",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:pdrmtaheri@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];

export const GISCUS: GiscusProps = {
  repo: "pdrmtaheri/blog",
  repoId: "R_kgDONfBvNw",
  category: "Announcements",
  categoryId: "DIC_kwDONfBvN84Cl8eU",
  mapping: "pathname",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};
