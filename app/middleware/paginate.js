const DEFAULT_PAGE_SIZE = process.env.DEFAULT_PAGE_SIZE || 30;
const MAX_PAGE_SIZE = process.env.MAX_PAGE_SIZE || 50;

module.exports = function(req, res, next) {
  const { offset = 0, limit = DEFAULT_PAGE_SIZE } = req.query;
  req.offset = parseInt(offset);
  req.limit = parseInt(limit) <= 30 ? parseInt(limit) : 30;
  req.limit = req.limit > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : req.limit;
  next();
};
