import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';
import yaml from 'js-yaml';
import { MdxSource } from 'next-mdx-remote/hydrate';

export interface MarkdownSource {
  source: MdxSource;
}

interface GrayMatterData<Data> extends GrayMatterFile<string> {
  data: Data;
}

export function getMarkdownData<Data>(category: string, slug: string) {
  const filePath = path.join(process.cwd(), 'src', 'markdown', category, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return matter(fileContents, {
    engines: {
      // eslint-disable-next-line @typescript-eslint/ban-types
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  }) as GrayMatterData<Data>;
}
