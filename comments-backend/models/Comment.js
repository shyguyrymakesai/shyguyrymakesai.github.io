import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  slug: { type: String, required: true, index: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', commentSchema);
