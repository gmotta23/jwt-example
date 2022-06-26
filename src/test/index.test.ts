import chai, { expect } from "chai";
import spies from "chai-spies";
import app from "../app";
import request from "supertest";
import AuthUseCases from "../use-cases/Auth";
import { JWTService } from "../services/Auth";
import { testCommands } from "./commands";
import { database, User } from "../db/postgres";

chai.use(spies);

describe("Unit tests", () => {
  before(() => {
    chai.spy.on(JWTService, "generateToken");
  });

  it("generateAccessToken calls JWTService.generateToken", () => {
    const payload = "test";

    AuthUseCases.generateAccessToken(payload);

    expect(JWTService.generateToken).to.have.been.called();
  });

  it("generateRefreshToken calls JWTService.generateToken", () => {
    const payload = "test";

    AuthUseCases.generateRefreshToken(payload);

    expect(JWTService.generateToken).to.have.been.called();
  });

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
  beforeEach(() => {
    testCommands.resetDB();
  });

  it("should register an user correctly, receiving correct tokens", async () => {
    const newUser: User = {
      username: "register",
      password: "password",
    };
    const response = await request(app).post("/register").send(newUser);

    const { access_token, refresh_token } = response.body;

    expect(access_token).to.exist;
    expect(refresh_token).to.exist;
  });

  it("should register and login with user correctly, receiving correct tokens", async () => {
    const user: User = {
      username: "login",
      password: "password",
    };
    await request(app).post("/register").send(user);
    const login = await request(app).post("/login").send(user);

    const { access_token, refresh_token } = login.body;

    expect(access_token).to.exist;
    expect(refresh_token).to.exist;
  });

  it("should fail to login correctly, not receiving correct tokens", async () => {
    const user: User = {
      username: "login",
      password: "password",
    };
    const incorrectPasswordUser = { ...user, password: "incorrect_password" };
    const register = await request(app).post("/register").send(user);
    const login = await request(app).post("/login").send(incorrectPasswordUser);

    const { access_token, refresh_token } = login.body;

    expect(access_token).to.not.exist;
    expect(refresh_token).to.not.exist;
  });
  // on refresh should receive access token if refresh token exists
  // on refresh should not receive access token if refresh token not exists
  /** */
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
