import Giscus, { type Theme } from "@giscus/react";
import { useEffect, useState, type ReactElement } from "react";

interface ICommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: ICommentsProps): ReactElement {
  const [giscusTheme, setGiscusTheme] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.dataset.theme?.includes("dark") ? darkTheme : lightTheme;
    }
    return lightTheme;
  });

  useEffect(() => {
    const updateGiscusTheme = (theme: string): void => {
      setGiscusTheme(theme?.includes("dark") ? darkTheme : lightTheme);
    };

    // Initial theme setup
    updateGiscusTheme(document.documentElement.dataset.theme || "");

    const observer = new MutationObserver((mutations): void => {
      mutations.forEach((mutation): void => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme" &&
          mutation.target instanceof HTMLElement
        ) {
          updateGiscusTheme(mutation.target.dataset.theme || "");
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return (): void => {
      observer.disconnect();
    };
  }, [darkTheme, lightTheme]);

  return (
    <div className="giscus-wrapper mt-8">
      <Giscus
        id="comments"
        repo="pdrmtaheri/blog"
        repoId="R_kgDONfBvNw"
        category="Announcements"
        categoryId="DIC_kwDONfBvN84Cl8eU"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}
        lang="en"
        loading="eager"
      />
    </div>
  );
}
