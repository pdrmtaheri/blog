import Fuse from "fuse.js";
import { useEffect, useRef, useState, useMemo, type ReactElement, type ChangeEvent } from "react";

import type { CollectionEntry } from "astro:content";

interface IProps {
  searchList: CollectionEntry<"blog">[];
}

interface ISearchResult {
  item: CollectionEntry<"blog">;
  refIndex: number;
}

interface ISearchResultsProps {
  searchResults: ISearchResult[];
  searchTerm: string;
}

function SearchResults({ searchResults, searchTerm }: ISearchResultsProps): ReactElement {
  return (
    <div className="mt-8">
      <div className="mb-4 text-2xl font-semibold">
        Found {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for &quot;
        {searchTerm}&quot;
      </div>
      <ul>
        {searchResults.map(({ item, refIndex }) => (
          <li key={`${refIndex}-${item.id}`} className="mb-4">
            <a href={`/posts/${item.slug}`} className="decoration-dashed hover:underline">
              <h3 className="text-lg font-medium">{item.data.title}</h3>
            </a>
            <p>{item.data.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Search({ searchList }: IProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ISearchResult[] | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputVal(e.target.value);
  };

  const fuse = useMemo(
    () =>
      new Fuse(searchList, {
        keys: ["data.title", "data.description"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [searchList]
  );

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr !== null && searchStr !== "") {
      setInputVal(searchStr);
    }
  }, []);

  useEffect(() => {
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery = `${window.location.pathname}?${searchParams.toString()}`;
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
  }, [inputVal]);

  useEffect(() => {
    if (inputVal.length > 0) {
      const results = fuse.search(inputVal);
      setSearchResults(results);
    } else {
      setSearchResults(null);
    }
  }, [inputVal, fuse]);

  return (
    <>
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
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
      {searchResults !== null && (
        <SearchResults searchResults={searchResults} searchTerm={inputVal} />
      )}
    </>
  );
}
