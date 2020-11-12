import {
  validateComment,
  validateLoginSchema,
  validatePostSchema,
  validateUserSchema,
} from "../helpers/validators";

export const validateUserBody = (req, res, next) => {
  const error = validateUserSchema(req.body);
  if (error.error) {
    return next({
      status: 400,
      error: error.error.details[0].message,
    });
  }
  return next();
};
export const validatePostBody = (req, res, next) => {
  const error = validatePostSchema(req.body);
  if (error.error) {
    return next({
      status: 400,
      error: error.error.details[0].message,
    });
  }
  return next();
};
export const validateLoginBody = (req, res, next) => {
  const error = validateLoginSchema(req.body);
  if (error.error) {
    return next({
      status: 400,
      error: error.error.details[0].message,
    });
  }
  return next();
};
export const validateCommentBody = (req, res, next) => {
  const error = validateComment(req.body);
  if (error.error) {
    return next({
      status: 400,
      error: error.error.details[0].message,
    });
  }
  return next();
};
