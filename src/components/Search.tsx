import Fuse from "fuse.js";
import { useEffect, useRef, useState, useMemo } from "react";
import type { CollectionEntry } from "astro:content";
import type { ReactElement, ChangeEvent } from "react";

interface Props {
  searchList: CollectionEntry<"blog">[];
}

interface SearchResult {
  item: CollectionEntry<"blog">;
  refIndex: number;
}

export default function Search({ searchList }: Props): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const fuse = useMemo(
    () =>
      new Fuse(searchList, {
        keys: ["data.title", "data.description", "slug"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [searchList],
  );

  useEffect(() => {
    // if URL has search query, insert that search query in input field
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    // put focus cursor at the end of the string
    setTimeout(function () {
      inputRef.current?.selectionStart &&
        (inputRef.current.selectionStart = inputRef.current?.value.length);
    }, 50);
  }, []);

  useEffect(() => {
    // Add search result only if input value is more than one character
    const searchStr = inputVal.trim();
    if (searchStr.length === 0) {
      setSearchResults(null);
      return;
    }
    if (searchStr.length === 1) {
      setSearchResults([]);
      return;
    }

    const results = fuse.search(searchStr).map(({ item, refIndex }) => ({
      item,
      refIndex,
    }));
    setSearchResults(results);

    // Update search string in URL
    if (searchStr.length > 1) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", searchStr);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    }
  }, [inputVal, fuse]);

  return (
    <>
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
          </svg>
        </span>
        <input
          className="block w-full rounded border border-skin-fill 
        border-opacity-40 bg-skin-fill py-3 pl-10
        pr-3 placeholder:italic placeholder:text-opacity-75 
        focus:border-skin-accent focus:outline-none"
          placeholder="Search for anything..."
          type="text"
          name="search"
          value={inputVal}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          ref={inputRef}
        />
      </label>

      {inputVal.length > 1 && (
        <div className="mt-8">
          Found {searchResults?.length}
          {searchResults?.length && searchResults?.length === 1
            ? " result"
            : " results"}{" "}
          for '{inputVal}'
        </div>
      )}

      <ul>
        {searchResults?.map(({ item }) => (
          <li key={item.slug} className="mt-4">
            <a
              href={`/posts/${item.slug}`}
              className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
            >
              <h2 className="text-lg font-medium decoration-dashed hover:underline">
                {item.data.title}
              </h2>
            </a>
            <p>{item.data.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
