/* eslint-disable no-underscore-dangle */
import Post from "../models/post";
// import Comment from "../models/comment";
import successResponse from "../helpers/successResponse";

export const getAllPosts = async (req, res, next) => {
  const limit = Number(req.query.limit) || 5;
  const page = (Number(req.query.page) || 1) - 1;
  try {
    return await Post.find()
      .limit(limit)
      .skip(limit * page)
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: ["-password", "-__v", "-isAdmin"],
      })
      .exec((err, postLists) => {
        Post.countDocuments().exec((_err, count) => {
          const message = "all post retrieved successfully";
          // console.log(count)
          const pages = count <= limit ? 1 : Math.ceil(count / limit);
          return successResponse(res, 200, message, {
            count,
            page: page + 1,
            pages,
            posts: postLists,
          });
        });
      });
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
    const data = {
      author: {
        name: req.user.name,
        _id,
        email: req.user.email,
      },
      comments: post.comments,
      title: post.title,
      createdAt: post.createdAt,
      modifiedAt: post.modifiedAt,
      _id: post._id,
      body: post.body,
    };
    return successResponse(res, 201, message, data);
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
      path: "author comments",
      populate: {
        path: "user",
        select: "-password",
      },
      select: "-password",
    });
    if (post) {
      const message = "succesfully retrieved post";
      return successResponse(res, 200, message, { post });
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
