import express from 'express';
import { PrismaClient } from './src/generated/prisma';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';
import { ethers } from 'ethers';
import KairosGlyphABI from './abi/KairosGlyph.json' assert { type: 'json' };

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, KairosGlyphABI, wallet);

const prisma = new PrismaClient();
const app = express();
app.use(cors());
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

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Kairos Glyph Mint' },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/mint.html?status=success`,
      cancel_url: `${process.env.FRONTEND_URL}/mint.html?status=cancel`,
    });
    res.json({ id: session.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Stripe session failed' });
  }
});

app.post('/mint', async (req, res) => {
  const { recipient, chargedBy, intention, duration } = req.body;
  try {
    const tx = await contract.releaseKame(recipient, chargedBy, intention, duration);
    const receipt = await tx.wait();
    res.json({ txHash: receipt.hash });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Minting failed' });
  }
});

export default app;

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`API server listening on ${port}`);
  });
}
