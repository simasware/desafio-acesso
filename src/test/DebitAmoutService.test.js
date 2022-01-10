const CreditAmountService = require("../service/CreditAmountService");

jest.setTimeout(10000);

test("Debit amount from account - TC1", async () => {
  const debitAmoutService = await CreditAmountService(
    "96466852",
    0.01,
    "Debit"
  );
  expect(debitAmoutService.success).toBe(true);
});

test("Debit an insane amount from account - TC1", async () => {
  const debitAmoutService = await CreditAmountService(
    "96466852",
    1048576,
    "Debit"
  );
  expect(debitAmoutService.success).toBe(false);
});

test("Debit from an inexistent account - TC2", async () => {
  const debitAmoutService = await CreditAmountService(
    "96466852",
    0.01,
    "Debit"
  );
  expect(debitAmoutService.success).toBe(true);
});
