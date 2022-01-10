const RequestLogger = (req, res, next) => {
  global.logger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = RequestLogger;
