import { User } from "../db/postgres";
import { UsersDBFunctions } from "../db/postgres/functions";
import { JWTService } from "../services/jwt";
import AuthUseCases from "../use-cases/Auth";

describe("Unit tests", () => {
  beforeEach(() => {
    JWTService.generateToken = jest.fn();
  });

  test("AuthUseCases.generateAccessToken calls JWTService.generateToken", () => {
    JWTService.generateToken = jest.fn();

    const payload = "test";

    AuthUseCases.generateAccessToken(payload);

    expect(JWTService.generateToken).toHaveBeenCalled();
  });

  test("AuthUseCases.generateRefreshToken calls JWTService.generateToken", () => {
    const payload = "test";

    AuthUseCases.generateRefreshToken(payload);

    expect(JWTService.generateToken).toHaveBeenCalled();
  });

  test("AuthUseCases.generateAccessAndRefreshTokens calls generateAccessToken and generateRefreshToken", () => {
    const payload = "test";

    AuthUseCases.generateAccessToken = jest.fn();
    AuthUseCases.generateRefreshToken = jest.fn();

    expect(AuthUseCases.generateAccessToken).not.toHaveBeenCalled();
    expect(AuthUseCases.generateRefreshToken).not.toHaveBeenCalled();

    AuthUseCases.generateAccessAndRefreshTokens(payload);

    expect(AuthUseCases.generateAccessToken).toHaveBeenCalledWith(payload);
    expect(AuthUseCases.generateRefreshToken).toHaveBeenCalledWith(payload);
  });

  test("AuthUseCases.createUser creates user with hashed password", async () => {
    JWTService.generateToken = jest.fn();

    const user: User = {
      username: "test",
      password: "Password1",
    };

    UsersDBFunctions.create = jest.fn();

    expect(UsersDBFunctions.create).not.toHaveBeenCalled();

    await AuthUseCases.createUser(user);

    expect(UsersDBFunctions.create).toHaveBeenCalledWith(user);
  });
});
