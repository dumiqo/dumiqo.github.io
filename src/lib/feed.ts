import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { href, t, type Lang } from '../i18n';
import { postPath, postsFor } from './posts';

// One feed per language: a subscriber reads the language they chose, and an RU feed
// never mixes in English titles. Both routes are thin wrappers over this.
export async function feed(context: APIContext, lang: Lang) {
  const posts = await postsFor(lang);
  const copy = t(lang);
  const site = context.site ?? new URL('https://dumiqo.github.io');

  return rss({
    title: copy.feedTitle,
    description: copy.feedDescription,
    // The channel link is this language's home, not the site root: otherwise a reader
    // of the Russian feed clicks the channel and lands on the English page.
    site: new URL(href(lang), site),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
    })),
    customData: `<language>${lang}</language>`,
  });
}
