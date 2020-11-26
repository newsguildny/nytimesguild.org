import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface TagContent {
  slug: string;
  name: string;
}

export function getTags() {
  const tagsFile = fs.readFileSync(path.join(process.cwd(), 'meta', 'tags.yml'), 'utf-8');
  const { tags } = yaml.safeLoad(tagsFile, { schema: yaml.JSON_SCHEMA }) as {
    tags: TagContent[];
  };
  return tags;
}
