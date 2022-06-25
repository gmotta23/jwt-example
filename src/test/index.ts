import { expect } from "chai";
import app from "../app";
import request from "supertest";

describe("UNIT tests", () => {
  it("should login as an user and return status 200, access_token and refresh_token", async () => {
    let response = await request(app).post("/login").send({ username: "gmtc" });

    let { access_token, refresh_token } = response.body;

    expect(access_token.length).to.be.eq(151);
    expect(refresh_token.length).to.be.eq(128);
  });
});
