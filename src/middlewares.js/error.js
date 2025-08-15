// Centralized error handler with clean JSON responses
export function errorHandler(err, req, res, next) {
  console.error(err);

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      status: "fail",
      message: "Validation error",
      errors: details
    });
  }

  // Handle duplicate key errors (unique indexes)
  if (err.code === 11000) {
    const fields = Object.keys(err.keyPattern || err.keyValue || {});
    return res.status(409).json({
      status: "fail",
      message: `Duplicate value for unique field(s): ${fields.join(", ")}`
    });
  }

  // CastError for invalid ObjectId, etc.
  if (err.name === "CastError") {
    return res.status(400).json({
      status: "fail",
      message: `Invalid ${err.path}: ${err.value}`
    });
  }

  // Default
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error"
  });
}

// 404 handler
export function notFound(req, res) {
  res.status(404).json({ status: "fail", message: "Route not found" });
}
