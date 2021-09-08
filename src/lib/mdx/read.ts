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
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as Record<string, unknown>,
    },
  }) as GrayMatterData<Data>;
  return { ...grayMatter, data: { filename, ...grayMatter.data } };
}
