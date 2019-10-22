module.exports = function(req, res, next) {
  res.success = function(obj) {
    if (obj && typeof obj.toJSON === 'function') {
      obj = obj.toJSON();
    }
    return res.json(Object.assign({
      success: true
    }, obj));
  };
  next();
};
