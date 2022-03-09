import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export function getPostSlugs(postPath: string): string[] {
  const postsDirectory = join(process.cwd(), postPath);
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(
  slug: string,
  fields: string[] = [],
  postPath?: string
) {
  if (postPath === undefined) {
    postPath = "_posts";
  }
  const postsDirectory = join(process.cwd(), postPath);
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Ensure only the minimal needed data is exposed
  return makeItems(fields, realSlug, content, data);
}

export type Items = {
  [key: string]: string;
};

export function makeItems(
  fields: string[],
  realSlug: string,
  content: string,
  data: { [key: string]: any }
): Items {
  const items: Items = {};
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });
  return items;
}

export function getAllPosts(fields: string[] = [], postPath?: string) {
  const path = postPath || "_posts";
  const slugs = getPostSlugs(path);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, path))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
