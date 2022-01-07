import axios from "axios";

const CreditAmountService = async (accountNumber, amount) => {
  const amountTransferRequest = await axios.post(
    `${process.env.BANK_API_URL}/Account`,
    {
      accountNumber: accountNumber,
      value: amount,
      type: "Credit",
    },
    {
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (amountTransferRequest.status === 200) {
    return {
      sucess: true,
      response: {
        status: "Sucess",
        message: "",
      },
    };
  }

  return {
    sucess: false,
    response: {
      status: "Error",
      message: amountTransferRequest.statusText,
    },
  };
};

export default CreditAmountService;
