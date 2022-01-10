const CreditAmountService = require("../service/CreditAmountService");

test("Transfering to an account - TC1", async () => {
  const creditAmountService = await CreditAmountService("96466852", 0.01);
  expect(creditAmountService.success).toBe(true);
});

test("Transfering to an inexistent account", async () => {
  const creditAmountService = await CreditAmountService("666", 0.01);
  expect(creditAmountService.success).toBe(false);
});
