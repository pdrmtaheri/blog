import type {} from "../.astro/types";

interface IImportMetaEnv {
  readonly PUBLIC_GISCUS_REPO: string;
  readonly PUBLIC_GISCUS_CATEGORY_ID: string;
  readonly PUBLIC_GISCUS_REPO_ID: string;
}

interface IImportMeta {
  readonly env: IImportMetaEnv;
}
