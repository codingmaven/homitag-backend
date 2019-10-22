module.exports = function(req, res, next) {
  res.error = function(message, code = 400, showToUser = true) {
    return res.status(code).json({
      success: false,
      code: code,
      message: message || 'Server error',
      showToUser: showToUser
    });
  };
  next();
};
