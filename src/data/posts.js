import matter from 'gray-matter';

// Eagerly import all markdown files under /posts
const postFiles = import.meta.glob('../../posts/**/*.md', { as: 'raw', eager: true });

const posts = Object.entries(postFiles).map(([path, raw]) => {
  const { data, content } = matter(raw);
  const match = path.match(/posts\/(\d{4})\/([^/]+)\.md$/);
  const year = match ? match[1] : '';
  const slug = match ? match[2] : path;
  return {
    ...data,
    year,
    slug,
    full: content,
  };
});

export { posts };
