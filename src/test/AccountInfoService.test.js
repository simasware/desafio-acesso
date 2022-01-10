const AccountInfoService = require("../service/AccountInfoService.js");

test("Checking if account has enough balance for transaction - TC1", async () => {
  const account = await AccountInfoService("96466852");
  expect(account.accountInfo.balance).toBeGreaterThan(10);
});

test("Checking if account exists", async () => {
  const account = await AccountInfoService("96466852");
  expect(account.accountInfo.accountNumber).toBeDefined();
});

test("Checking an account that does not exists", async () => {
  const account = await AccountInfoService("666");
  expect(account.accountInfo.success).toBe(false);
});
