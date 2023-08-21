// postModel.js

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  image: String,
  title: String,
  content: String,
});

export const Post = mongoose.model('Post', postSchema);


