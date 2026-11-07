import { getCollection, type CollectionEntry } from 'astro:content';
import { href, languages, type Lang } from '../i18n';

export type Post = CollectionEntry<'blog'>;

// Language comes from the folder, not from frontmatter: Russian posts live in
// src/content/blog/ru/, so a post cannot claim a language it does not have a URL for.
export const langOf = (post: Post): Lang => (post.id.startsWith('ru/') ? 'ru' : 'en');

// `ru/0001-slug` and `0001-slug` are the same slug - that equality is what makes
// them a translation pair. No extra frontmatter field, nothing to keep in sync.
export const slugOf = (post: Post) => post.id.replace(/^ru\//, '');

export const postPath = (post: Post) => href(langOf(post), `writing/${slugOf(post)}/`);

export async function postsFor(lang: Lang): Promise<Post[]> {
  const posts = await getCollection('blog', (post) => !post.data.draft && langOf(post) === lang);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// The translation, if it exists and if it is published. Absent is a normal state:
// a post does not wait for its twin before it ships.
export async function counterpart(post: Post): Promise<Post | undefined> {
  const slug = slugOf(post);
  const other = languages.find((lang) => lang !== langOf(post));
  if (!other) return undefined;
  const posts = await getCollection('blog', (p) => !p.data.draft && langOf(p) === other);
  return posts.find((p) => slugOf(p) === slug);
}

// hreflang alternates for a page that exists in both languages.
export function alternates(path: string, langs: Lang[] = [...languages]) {
  return langs.map((lang) => ({ lang, href: href(lang, path) }));
}
