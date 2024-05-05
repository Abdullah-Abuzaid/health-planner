import API from "@/core/api_utils/Api-Route.utils";
import { AuthUser } from "@prisma/client";
import { ApiError } from "next/dist/server/api-utils";

export interface RegisterInterface {
  email: string;
  password: string;
}
export interface LoginInterface {
  email: string;
  password: string;
}

export default class AuthenticationServices {
  private constructor() {}
  static async register({ email, password }: RegisterInterface) {
    return await API.post<AuthUser, RegisterInterface>("/api/register", {
      email,
      password,
    });
  }
  static async login({ email, password }: LoginInterface) {
    return await API.post<AuthUser, LoginInterface>("/api/login", {
      email,
      password,
    });
  }
}
