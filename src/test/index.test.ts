import chai, { expect } from "chai";
import spies from "chai-spies";
import app from "../app";
import request from "supertest";
import AuthUseCases from "../use-cases/Auth";
import { JWTService } from "../services/jwt";
import { testCommands } from "./commands";
import { User } from "../db/postgres";
import { UsersDBFunctions } from "../db/postgres/functions";

chai.use(spies);

describe("Unit tests", () => {
  before(() => {
    chai.spy.on(JWTService, "generateToken");
  });

  it("AuthUseCases.generateAccessToken calls JWTService.generateToken", () => {
    const payload = "test";

    AuthUseCases.generateAccessToken(payload);

    expect(JWTService.generateToken).to.have.been.called();
  });

  it("AuthUseCases.generateRefreshToken calls JWTService.generateToken", () => {
    const payload = "test";

    AuthUseCases.generateRefreshToken(payload);

    expect(JWTService.generateToken).to.have.been.called();
  });

  it("AuthUseCases.generateAccessAndRefreshTokens calls generateAccessToken and generateRefreshToken", () => {
    const payload = "test";

    chai.spy.on(AuthUseCases, "generateAccessToken");
    chai.spy.on(AuthUseCases, "generateRefreshToken");

    expect(AuthUseCases.generateAccessToken).to.not.have.been.called();
    expect(AuthUseCases.generateRefreshToken).to.not.have.been.called();

    AuthUseCases.generateAccessAndRefreshTokens(payload);

    expect(AuthUseCases.generateAccessToken).to.have.been.called.with(payload);
    expect(AuthUseCases.generateRefreshToken).to.have.been.called.with(payload);
  });

  it("AuthUseCases.createUser creates user with hashed password", async () => {
    const user: User = {
      username: "test",
      password: "Password1",
    };
    chai.spy.on(UsersDBFunctions, "create");

    expect(UsersDBFunctions.create).to.not.have.been.called();

    await AuthUseCases.createUser(user);

    expect(UsersDBFunctions.create).to.have.been.called.with(user);
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

  it("on refresh should fail to receive access token if access token isn't provided (Middleware block)", async () => {
    const user: User = {
      username: "register",
      password: "password",
    };
    const register = await request(app).post("/register").send(user);
    const { refresh_token } = register.body;

    const refresh = await request(app)
      .post("/refresh_access_token")
      .send({ refresh_token: refresh_token });

    expect(refresh.status).to.eq(403);
    expect(refresh.body.access_token).not.to.exist;
  });

  it("on refresh should not receive access token if refresh token is provided incorrectly", async () => {
    const user: User = {
      username: "register",
      password: "password",
    };
    const register = await request(app).post("/register").send(user);
    const { access_token, refresh_token } = register.body;

    const refresh = await request(app)
      .post("/refresh_access_token")
      .send({ refresh_token: refresh_token + "incorrect!" })
      .set("authorization", `Bearer ${access_token}`);

    expect(refresh.status).to.eq(400);
    expect(refresh.body.access_token).not.to.exist;
  });

  it("on refresh should receive access token if refresh token exists and access token is provided", async () => {
    const user: User = {
      username: "register",
      password: "password",
    };
    const register = await request(app).post("/register").send(user);

    const { access_token, refresh_token } = register.body;

    const refresh = await request(app)
      .post("/refresh_access_token")
      .send({ refresh_token })
      .set("authorization", `Bearer ${access_token}`);

    expect(refresh.body.access_token).to.exist;
    expect(refresh.status).to.eq(200);
  });
});
