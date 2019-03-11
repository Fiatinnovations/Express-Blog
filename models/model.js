const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/** **User Model*** */

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  displayName: { type: String },
  bio: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    match: [
      /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
      'please fill in the correct email address.'
    ]
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

/** **Post Model*** */

const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
  comments: [{ type: String, default: Date.now }],
  date: { type: String, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

const models = {
  Posts: mongoose.model('Posts', postSchema),
  User: mongoose.model('User', userSchema)
};

module.exports(models);
