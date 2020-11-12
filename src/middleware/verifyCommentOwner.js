import Comment from "../models/comment";

export default async (req, res, next) => {
  const { commendtId } = req.params;
  const { _id: userId } = req.user;
  try {
    const comment = await Comment.findById({ _id: commendtId });
    if (comment) {
      if (String(comment.user) === userId) {
        req.comment = comment;
        return next();
      }
      return next({
        status: 401,
        error: "Sorry on the owner can delete comment",
      });
    }
    return res.status(404).json({
      status: "error",
      error: "comment not found",
    });
  } catch (error) {
    return next({
      status: 400,
      error,
    });
  }
};
