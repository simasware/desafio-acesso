const axios = require("axios");
const AccountInfoService = async (accountNumber) => {
  const accountBalanceRequest = await axios.get(
    `${process.env.BANK_API_URL}/Account/${accountNumber}`,
    {
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (accountBalanceRequest.status) {
    return {
      success: true,
      accountInfo: accountBalanceRequest.data,
    };
  }
  return { success: false, accountInfo: {} };
};

module.exports = AccountInfoService;
