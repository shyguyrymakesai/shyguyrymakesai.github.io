import matter from 'gray-matter';

const files = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const posts = Object.entries(files).map(([path, raw]) => {
  const { data, content } = matter(raw);
  const slug = path.split('/').pop().replace(/\.md$/, '');
  return {
    ...data,
    content,
    slug,
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

export { posts };
