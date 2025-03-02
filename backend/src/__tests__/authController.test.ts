// src/__tests__/authController.test.ts
import { login } from "../controllers/authController";
import User from "../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Mokea las funciones que acceden a la base de datos, bcrypt y jwt
jest.mock("../models/Users");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("login controller", () => {
    const req = {
        body: {
          email: "test@example.com",
          password: "testpassword",
        },
      } as any; // Simulamos la Request
      

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería devolver error si el usuario no existe", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await login(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Credenciales inválidas" });
  });

  it("debería devolver error si la contraseña es incorrecta", async () => {
    const userMock = { _id: "123", email: "test@example.com", password: "hashedPassword", role: "user" };
    (User.findOne as jest.Mock).mockResolvedValue(userMock);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await login(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Credenciales inválidas" });
  });

  it("debería retornar un token si el login es exitoso", async () => {
    const userMock = { _id: "123", email: "test@example.com", password: "hashedPassword", role: "user" };
    (User.findOne as jest.Mock).mockResolvedValue(userMock);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("token");

    await login(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "token" });
  });
});
