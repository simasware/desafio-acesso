const AppMessage = (status, message, success = true) => {
  return {
    success,
    response: {
      status,
      message,
    },
  };
};

module.exports = AppMessage;
