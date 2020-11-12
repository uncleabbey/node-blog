const errorResponse = (res, error) => {
  const { status, error: err } = error;
  res.status(status);
  return res.json({
    status: "error",
    error: err,
  });
};

export default errorResponse;
