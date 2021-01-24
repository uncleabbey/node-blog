import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;
const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
  comments: [
  {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  }
  ]
});

const Post = model("Post", postSchema);

export default Post;
