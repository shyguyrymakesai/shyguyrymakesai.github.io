import express from 'express';
import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/api/posts', async (req, res) => {
  const { tag, category } = req.query;
  const where = {};
  if (category) where.category = { name: category };
  if (tag) where.tags = { some: { name: tag } };
  const posts = await prisma.post.findMany({ where, include: { tags: true, category: true } });
  res.json(posts);
});

app.post('/api/comments', async (req, res) => {
  const { postId, content, author } = req.body;
  const comment = await prisma.comment.create({
    data: { content, author, postId: Number(postId) },
  });
  res.json(comment);
});

app.get('/api/comments', async (req, res) => {
  const { postId } = req.query;
  const comments = await prisma.comment.findMany({
    where: { postId: Number(postId) },
  });
  res.json(comments);
});

export default app;

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`API server listening on ${port}`);
  });
}
