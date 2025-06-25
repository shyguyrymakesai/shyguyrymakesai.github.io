import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Comment from './models/Comment.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Get comments for a post
app.get('/api/comments/:slug', async (req, res) => {
  try {
    const comments = await Comment.find({ slug: req.params.slug }).sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Post a new comment
app.post('/api/comments/:slug', async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  try {
    const comment = new Comment({
      slug: req.params.slug,
      name,
      message
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save comment' });
  }
});

// Serve dynamic metadata for tokens
app.get('/metadata/:id', (req, res) => {
  const { id } = req.params;
  // Example: only token #1 for now
  if (id === '1') {
    res.json({
      name: "FlameCoin Genesis #1",
      description: "The first soulbound FlameCoin, minted by Ryan.",
      image: "https://yourdomain.com/path/to/image.png", // Update to your actual image URL
      attributes: [
        { trait_type: "Generation", value: "Genesis" },
        { trait_type: "Owner", value: "Ryan" }
      ]
    });
  } else {
    res.status(404).json({ error: "Metadata not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
