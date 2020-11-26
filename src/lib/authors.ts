import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface AuthorContent {
  slug: string;
  name: string;
  introduction: string;
}

export function getAuthors() {
  const authorsFile = fs.readFileSync(path.join(process.cwd(), 'meta', 'authors.yml'), 'utf-8');
  const { authors } = yaml.safeLoad(authorsFile, { schema: yaml.JSON_SCHEMA }) as {
    authors: AuthorContent[];
  };
  return authors;
}
