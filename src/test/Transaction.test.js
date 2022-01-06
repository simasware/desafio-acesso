test("Transaction with balance 1", async () => {
  expect(2).toBeGreaterThan(0);
});

test("Transaction with not enough balance 2", async () => {
  expect(2).toBeGreaterThan(0);
});

test("Transaction with negative value 3", async () => {
  expect(-2).toBeGreaterThan(0);
});

test("Transaction with negative value 4", async () => {
  expect("aaaa").toEqual(expect.any(Number));
});
