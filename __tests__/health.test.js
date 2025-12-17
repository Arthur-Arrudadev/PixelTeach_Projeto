const request = require("supertest");
const app = require("../index");

describe("Teste básico do servidor", () => {
  it("deve responder 200 no endpoint /health", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
