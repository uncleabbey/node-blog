const successResponse = (res, status, message, data) => {
  return res.status(status).json({
    status: "success",
    message,
    data,
  });
};

export default successResponse;
