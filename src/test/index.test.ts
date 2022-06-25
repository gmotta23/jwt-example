import chai, { expect } from "chai";
import app from "../app";
import request from "supertest";
import AuthUseCases from "../use-cases/Auth";

describe("Units", () => {
  it("generateAccessToken calls ...", () => {
    // const payload = "test";
    // const result = AuthUseCases.generateAccessAndRefreshTokens(payload);
    // console.log(result);
  });
});

describe("Authentication", () => {
  // it("should register an user correctly, receiving correct tokens", async () => {
  //   let response = await request(app)
  //     .post("/register")
  //     .send({ username: "gmtc" });
  //   // expect().to.be.call()
  // });
  // it("should login as an user and return status 200, access_token and refresh_token", async () => {
  //   let response = await request(app).post("/login").send({ username: "gmtc" });
  //   let { access_token, refresh_token } = response.body;
  //   expect(access_token.length).to.be.eq(151);
  //   expect(refresh_token.length).to.be.eq(128);
  // });
  // it("refresh should respond with a new access token if refresh token found");
  // it("refresh should respond with nothing if refresh token not found");
});
