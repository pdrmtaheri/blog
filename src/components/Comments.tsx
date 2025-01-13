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
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    // Initial theme setup
    const currentTheme = localStorage.getItem("theme");
    setTheme(currentTheme?.includes("dark") ? darkTheme : lightTheme);

    // Theme change observer
    const observer = new MutationObserver((mutations): void => {
      mutations.forEach((mutation): void => {
        if (mutation.target instanceof HTMLElement) {
          const isDark = mutation.target.classList.contains("dark");
          setTheme(isDark ? darkTheme : lightTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
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
        repoId="R_kgDOLNGQrw"
        category="Announcements"
        categoryId="DIC_kwDOLNGQr84CcvXE"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="en"
        loading="eager"
      />
    </div>
  );
}
