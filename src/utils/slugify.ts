import kebabcase from "lodash.kebabcase";

const slugifyStr = (str: string): string => {
  return kebabcase(str);
};

const slugifyAll = (str: string | undefined): string => {
  if (!str) return "";
  return slugifyStr(str);
};

export default slugifyAll;
