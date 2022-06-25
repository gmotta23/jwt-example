import chai, { expect } from "chai";
import spies from "chai-spies";
import app from "../app";
import request from "supertest";
import AuthUseCases from "../use-cases/Auth";

chai.use(spies);

describe("Unit tests", () => {
  it("generateAccessAndRefreshTokens calls generateAccessToken and generateRefreshToken", () => {
    const payload = "test";

    chai.spy.on(AuthUseCases, "generateAccessToken");
    chai.spy.on(AuthUseCases, "generateRefreshToken");

    expect(AuthUseCases.generateAccessToken).to.not.have.been.called();
    expect(AuthUseCases.generateRefreshToken).to.not.have.been.called();

    AuthUseCases.generateAccessAndRefreshTokens(payload);

    expect(AuthUseCases.generateAccessToken).to.have.been.called.with(payload);
    expect(AuthUseCases.generateRefreshToken).to.have.been.called.with(payload);
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
