import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import {
  CmsConfig,
  CmsFieldSelect,
  CmsSelectWidgetOptionObject,
} from "netlify-cms-core";
import { getMarkdownData } from "../mdx/read";

export interface TestimonialData {
  category: string;
  filename: string;
  name: string;
  role: string;
  highlight: boolean;
  headshot?: string;
}

export function getTestimonialsFilenames() {
  return fs
    .readdirSync(path.join(process.cwd(), "src", "markdown", "testimonials"))
    .map((paper) => paper.slice(0, paper.length - 4));
}

export function getTestimonialsMetadata() {
  return getTestimonialsFilenames().map(
    (slug) => getMarkdownData<TestimonialData>("testimonials", slug).data,
  );
}

export function getTestimonialData(filename: string) {
  const markdownData = getMarkdownData<TestimonialData>(
    "testimonials",
    filename,
  );
  return {
    category: markdownData.data.category,
    filename: markdownData.data.filename,
    name: markdownData.data.name,
    role: markdownData.data.role,
    highlight: markdownData.data.highlight,
    ...(markdownData.data.headshot && { headshot: markdownData.data.headshot }),
    content: markdownData.content,
  };
}

export function getTestimonialCategories() {
  const configFile = fs.readFileSync(
    path.join(process.cwd(), "src", "markdown", "config.yml"),
    "utf-8",
  );
  const config = yaml.load(configFile, {
    schema: yaml.JSON_SCHEMA,
  }) as CmsConfig;
  const categoryField = config.collections
    .find((collection) => collection.name === "testimonials")!
    .fields!.find((field) => field.name === "category")! as CmsFieldSelect;
  return categoryField.options as CmsSelectWidgetOptionObject[];
}

export function getTestimonialsData(category: string) {
  return getTestimonialsFilenames()
    .map((filename) => getTestimonialData(filename))
    .filter((testimonial) => testimonial.category === category);
}
