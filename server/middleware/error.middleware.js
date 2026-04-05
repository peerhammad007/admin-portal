const errorHandler = (err, req, res, next) => {
  console.log(err);

  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      message: err.message || "Server error",
    },
  });
};

module.exports = errorHandler;