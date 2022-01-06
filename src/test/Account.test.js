const axios = require("axios");

test("Checking if account has balance", async () => {
  await axios({
    method: "get",
    url: "http://localhost:5000/api/Account/76640883",
    responseType: "JSON",
    headers: {
      "Content-Encoding": "gzip",
    },
  }).then((response) => {
    const accountBalance = response.data;
    expect(accountBalance.balance).toBeGreaterThan(0);
  });
});

test("Checking if account has enough balance for transaction ", async () => {
  await axios({
    method: "get",
    url: "http://localhost:5000/api/Account/96883569",
    responseType: "JSON",
    headers: {
      "Content-Encoding": "gzip",
    },
  }).then((response) => {
    const accountBalance = response.data;
    expect(accountBalance.balance).toBeGreaterThan(75);
  });
});
