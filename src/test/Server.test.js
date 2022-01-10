const supertest = require("supertest");

const request = supertest("http://localhost:3333");

test("Server running on port 5678", async () => {
  const response = await request.get("/");
  expect(response.status).toBe(200);
});

test("Fund transfer request with negative amount", async () => {
  const payload = {
    accountOrigin: "96466852",
    accountDestination: "96351597",
    value: -1,
  };
  const response = await request.post("/api/fund-transfer").send(payload);
  expect(response.status).toBe(400);
});

test("Fund transfer request ", async () => {
  const payload = {
    accountOrigin: "96466852",
    accountDestination: "96351597",
    value: 0.01,
  };
  const response = await request.post("/api/fund-transfer").send(payload);
  expect(response.status).toBe(200);
});

test("Transfer status", async () => {
  const transactionId = "f9f01cc3-01f8-4835-aed8-c187b378bb18";
  const response = await request.get(`/api/fund-transfer/${transactionId}`);
  expect(response.status).toBe(200);
});
