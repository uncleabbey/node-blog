import Comment from "../models/comment";
import successResponse from "../helpers/successResponse";

export const addComment = async (req, res, next) => {
  const { id: postId } = req.params;
  const { _id: userId } = req.user;
  const { body } = req.body;

  try {
    const comment = new Comment({
      post: postId,
      user: userId,
      body,
    });
    await comment.save();
    const message = "comment created successfully";
    return successResponse(res, 201, message, comment);
  } catch (error) {
    return next({
      status: "error",
      error,
    });
  }
};
export const deleteComment = (req, res) => {
  const { comment } = req;
  comment.deleteOne();
  const message = "succesfully deleted the comment";
  return successResponse(res, 200, message);
};
