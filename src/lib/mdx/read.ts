import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';
import yaml from 'js-yaml';
import { MdxRemote } from 'next-mdx-remote/types';

export interface MarkdownSource {
  source: MdxRemote.Source;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface GrayMatterData<Data extends { [key: string]: any }> extends GrayMatterFile<string> {
  data: Data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMarkdownData<Data extends { [key: string]: any }>(
  category: string,
  filename: string
) {
  const filePath = path.join(process.cwd(), 'src', 'markdown', category, `${filename}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const grayMatter = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as Record<string, unknown>,
    },
  }) as GrayMatterData<Data>;
  return { ...grayMatter, data: { filename, ...grayMatter.data } };
}
