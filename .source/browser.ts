// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "cache-components/concepts.mdx": () => import("../content/docs/cache-components/concepts.mdx?collection=docs"), "cache-components/implementation.mdx": () => import("../content/docs/cache-components/implementation.mdx?collection=docs"), "cache-components/index.mdx": () => import("../content/docs/cache-components/index.mdx?collection=docs"), "cache-components/revalidation.mdx": () => import("../content/docs/cache-components/revalidation.mdx?collection=docs"), }),
};
export default browserCollections;