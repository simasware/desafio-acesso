import axios from "axios";
import AppMessage from "../classes/AppMessage.js";
import AccountInfoService from "./AccountInfoService.js";

const DebitAmountService = async (accountNumber, amount) => {
  const accountInfo = await AccountInfoService(accountNumber);
  if (accountInfo?.balance < amount) {
    return AppMessage("Error", "Not enough balance", false);
  }
  const debitAmountRequest = await axios.post(
    `${process.env.BANK_API_URL}/Account`,
    {
      accountNumber: accountNumber,
      value: amount,
      type: "Debit",
    },
    {
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (debitAmountRequest.status === 200) {
    AppMessage("Success");
  }

  return AppMessage("Error", "Failed to debit amount from account.", false);
};

export default DebitAmountService;
