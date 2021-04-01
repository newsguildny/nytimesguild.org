import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';
import yaml from 'js-yaml';
import { MdxRemote } from 'next-mdx-remote/types';

export interface MarkdownSource {
  source: MdxRemote.Source;
}

interface GrayMatterData<Data> extends GrayMatterFile<string> {
  data: Data;
}

export function getMarkdownData<Data>(category: string, filename: string) {
  const filePath = path.join(process.cwd(), 'src', 'markdown', category, `${filename}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const grayMatter = matter(fileContents, {
    engines: {
      // eslint-disable-next-line @typescript-eslint/ban-types
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  }) as GrayMatterData<Data>;
  return { ...grayMatter, data: { filename, ...grayMatter.data } };
}
