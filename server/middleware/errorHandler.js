function errorHandler(err, req, res, next) {
    console.error("Error log:", err.message);
    res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
}

module.exports = errorHandler;
