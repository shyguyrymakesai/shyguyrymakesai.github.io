import request from 'supertest';
import { PrismaClient } from '../src/generated/prisma';
import app from '../server.js';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.$disconnect();
});

describe('Tag CRUD', () => {
  test('create/read/update/delete', async () => {
    const tag = await prisma.tag.create({ data: { name: 'TestTag' } });
    expect(tag.id).toBeDefined();

    const found = await prisma.tag.findUnique({ where: { id: tag.id } });
    expect(found.name).toBe('TestTag');

    const updated = await prisma.tag.update({ where: { id: tag.id }, data: { name: 'UpdatedTag' } });
    expect(updated.name).toBe('UpdatedTag');

    await prisma.tag.delete({ where: { id: tag.id } });
    const after = await prisma.tag.findUnique({ where: { id: tag.id } });
    expect(after).toBeNull();
  });
});

describe('Category CRUD', () => {
  test('create/read/update/delete', async () => {
    const category = await prisma.category.create({ data: { name: 'Cat1' } });
    const found = await prisma.category.findUnique({ where: { id: category.id } });
    expect(found.name).toBe('Cat1');

    const updated = await prisma.category.update({ where: { id: category.id }, data: { name: 'Cat2' } });
    expect(updated.name).toBe('Cat2');

    await prisma.category.delete({ where: { id: category.id } });
    const after = await prisma.category.findUnique({ where: { id: category.id } });
    expect(after).toBeNull();
  });
});

describe('Comment CRUD', () => {
  let post;
  beforeAll(async () => {
    const category = await prisma.category.create({ data: { name: 'TempCat' } });
    const tag = await prisma.tag.create({ data: { name: 'TempTag' } });
    post = await prisma.post.create({
      data: {
        title: 'Post',
        content: 'Content',
        categoryId: category.id,
        tags: { connect: { id: tag.id } },
      },
    });
  });

  test('create/read/delete', async () => {
    const comment = await prisma.comment.create({ data: { content: 'Hi', postId: post.id, author: 'me' } });
    const found = await prisma.comment.findUnique({ where: { id: comment.id } });
    expect(found.content).toBe('Hi');

    await prisma.comment.delete({ where: { id: comment.id } });
    const after = await prisma.comment.findUnique({ where: { id: comment.id } });
    expect(after).toBeNull();
  });
});

describe('API Endpoints', () => {
  test('filter posts and handle comments', async () => {
    const category = await prisma.category.create({ data: { name: 'ApiCat' } });
    const tag = await prisma.tag.create({ data: { name: 'ApiTag' } });
    const post = await prisma.post.create({
      data: {
        title: 'ApiPost',
        content: 'Body',
        categoryId: category.id,
        tags: { connect: { id: tag.id } },
      },
    });

    const resPosts = await request(app).get('/api/posts').query({ tag: 'ApiTag', category: 'ApiCat' });
    expect(resPosts.body.length).toBeGreaterThanOrEqual(1);

    const resCreate = await request(app).post('/api/comments').send({ postId: post.id, content: 'Hello', author: 'test' });
    expect(resCreate.body.content).toBe('Hello');

    const resComments = await request(app).get('/api/comments').query({ postId: post.id });
    expect(resComments.body.length).toBeGreaterThanOrEqual(1);
  });
});
