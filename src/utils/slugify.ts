import kebabCase from "lodash.kebabcase";

const slugifyStr = (str: string | undefined | null): string => {
  if (str === undefined || str === null || str === "") {
    return "";
  }
  return kebabCase(str);
};

export default slugifyStr;
