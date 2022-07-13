import request from "supertest";
import { testCommands } from "./commands";

import { User } from "../db/postgres";
import app from "../app";

describe("Authentication", () => {
  beforeEach(async () => {
    testCommands.resetDB();
    await testCommands.resetRedis();
  });

  test("should register an user correctly, receiving correct tokens", async () => {
    const newUser: User = {
      username: "register",
      password: "password",
    };
    const response = await request(app).post("/register").send(newUser);

    const { access_token, refresh_token } = response.body;

    expect(access_token).toBeDefined();
    expect(refresh_token).toBeDefined();
  });

  test("should register and login with user correctly, receiving correct tokens", async () => {
    const user: User = {
      username: "login",
      password: "password",
    };
    await request(app).post("/register").send(user);
    const login = await request(app).post("/login").send(user);

    const { access_token, refresh_token } = login.body;

    expect(access_token).toBeDefined();
    expect(refresh_token).toBeDefined();
  });

  test("should fail to login correctly, not receiving correct tokens", async () => {
    const user: User = {
      username: "login",
      password: "password",
    };
    const incorrectPasswordUser = { ...user, password: "incorrect_password" };
    const register = await request(app).post("/register").send(user);
    const login = await request(app).post("/login").send(incorrectPasswordUser);

    const { access_token, refresh_token } = login.body;

    expect(access_token).toBeUndefined();
    expect(refresh_token).toBeUndefined();
  });

  test("on refresh should fail to receive access token if access token isn't provided (Middleware block)", async () => {
    const user: User = {
      username: "register",
      password: "password",
    };
    const register = await request(app).post("/register").send(user);
    const { refresh_token } = register.body;

    const refresh = await request(app)
      .post("/refresh_access_token")
      .send({ refresh_token: refresh_token });

    expect(refresh.status).toEqual(403);
    expect(refresh.body.access_token).not.toBeDefined();
  });

  test("on refresh should not receive access token if refresh token is provided incorrectly", async () => {
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

    expect(refresh.status).toEqual(400);
    expect(refresh.body.access_token).not.toBeDefined();
  });

  test("on refresh should receive access token if refresh token exists and access token is provided", async () => {
    const user: User = {
      username: "refresh",
      password: "password",
    };
    const register = await request(app).post("/register").send(user);

    const { access_token, refresh_token } = register.body;

    const refresh = await request(app)
      .post("/refresh_access_token")
      .send({ refresh_token })
      .set("authorization", `Bearer ${access_token}`);

    expect(refresh.body.access_token).toBeDefined();
    expect(refresh.status).toEqual(200);
  });
});
