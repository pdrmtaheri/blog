import kebabCase from "lodash.kebabcase";

const slugifyStr = (str: string | null | undefined): string => {
  if (str === undefined || str === null || str === "") {
    return "";
  }
  return kebabCase(str);
};

export default slugifyStr;
