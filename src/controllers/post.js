import Post from "../models/post";
import Comment from "../models/comment";
import successResponse from "../helpers/successResponse";

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ modifiedAt: -1 })
      .populate({
        path: "author",
        select: ["-password", "-__v", "-isAdmin"],
      });
    const message = "all post retrieved successfully";
    return successResponse(res, 200, message, posts);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
export const addPost = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const { _id } = req.user;
    const post = new Post({
      title,
      body,
      author: _id,
    });
    await post.save();
    const message = "post added successfully";
    return successResponse(res, 201, message, post);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
export const getPost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({ _id: id }).populate({
      path: "author",
      select: "-password",
    });
    if (post) {
      // eslint-disable-next-line no-underscore-dangle
      const comments = await Comment.find({ post: post._id })
        .sort({ modifiedAt: -1 })
        .populate({
          path: "user",
          select: ["-password", "-__v", "-isAdmin"],
        });
      const message = "succesfully retrieved post";
      return successResponse(res, 200, message, { post, comments });
    }
    return next({
      status: 404,
      error: "post not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
export const modifyPost = async (req, res) => {
  const { title, body } = req.body;
  const { post } = req;
  post.title = title;
  post.body = body;
  post.modifiedAt = new Date();
  post.save();
  const message = "succesfully modified the post";
  return successResponse(res, 202, message, post);
};
export const deletePost = async (req, res) => {
  const { post } = req;
  post.deleteOne();
  const message = "succesfully deleted the post";
  return successResponse(res, 200, message, post);
};
export const postByUsers = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const posts = await Post.find({ author: userId }).populate({
      path: "author",
      select: ["-password", "-__v", "-isAdmin"],
    });
    const message = "Successfully retrieved post by user";
    return successResponse(res, 200, message, posts);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
