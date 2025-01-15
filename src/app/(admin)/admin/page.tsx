import yaml from "js-yaml";
import { CmsConfig } from "netlify-cms-core";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Netlify } from "src/components/admin/Netlify";

export default async function AdminPage() {
  const configFile = await readFile(
    join(process.cwd(), "src", "markdown", "config.yml"),
    "utf-8",
  );
  const config = yaml.load(configFile, {
    schema: yaml.JSON_SCHEMA,
  }) as CmsConfig;

  return <Netlify config={config} />;
}
