import fs from 'fs';
import { fakePosts } from '../src/data/posts.js';

const siteUrl = 'https://shyguyrymakesai.github.io';

function escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const items = fakePosts.map(post => {
  const link = `${siteUrl}/#/blog/${post.id}`;
  return `  <item>\n    <title>${escape(post.title)}</title>\n    <link>${link}</link>\n    <guid>${link}</guid>\n    <description>${escape(post.snippet)}</description>\n  </item>`;
}).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>Ryan Martinez Blog</title>\n  <link>${siteUrl}</link>\n  <description>Latest posts from Ryan Martinez</description>\n${items}\n</channel>\n</rss>`;

fs.writeFileSync('./public/rss.xml', rss);
console.log('RSS feed generated');
