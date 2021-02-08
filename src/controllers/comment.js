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
    const data = {
      createdAt: comment.createdAt,
      modifiedAt: comment.modifiedAt,
      _id: comment._id,
      body: comment.body,
      user: {
        _id: req.user.id,
        name: req.user.name,
        email: req.user.email
      }
    }
    return successResponse(res, 201, message, data);
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
