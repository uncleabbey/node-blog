import Comment from "../models/comment";
import successResponse from "../helpers/successResponse";
import Post from "../models/post";

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
    await Post.findByIdAndUpdate(
      postId,
      // eslint-disable-next-line no-underscore-dangle
      { $addToSet: { comments: comment._id } },
      { useFindAndModify: false }
    );

    const message = "comment created successfully";
    return successResponse(res, 201, message, comment);
  } catch (error) {
    return next({
      status: 500,
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
