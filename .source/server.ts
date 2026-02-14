// @ts-nocheck
import * as __fd_glob_5 from "../content/docs/cache-components/revalidation.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/cache-components/index.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/cache-components/implementation.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/cache-components/concepts.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/cache-components/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"cache-components/meta.json": __fd_glob_0, }, {"index.mdx": __fd_glob_1, "cache-components/concepts.mdx": __fd_glob_2, "cache-components/implementation.mdx": __fd_glob_3, "cache-components/index.mdx": __fd_glob_4, "cache-components/revalidation.mdx": __fd_glob_5, });