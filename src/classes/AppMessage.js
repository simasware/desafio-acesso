const AppMessage = (status, message, success = true) => {
  return {
    success,
    error: {
      status,
      message,
    },
  };
};

export default AppMessage;
