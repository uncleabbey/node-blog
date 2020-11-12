import Post from "../models/post";

export default async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  try {
    const post = await Post.findById({ _id: id });
    if (post) {
      if (String(post.author) === userId) {
        req.post = post;
        return next();
      }
      return next({
        status: 401,
        error: "Sorry on the owner can edit",
      });
    }
    return next({
      status: 404,
      error: "post not found",
    });
  } catch (error) {
    return next({
      status: 400,
      error,
    });
  }
};
