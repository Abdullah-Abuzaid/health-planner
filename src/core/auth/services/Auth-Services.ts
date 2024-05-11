import API from "@/core/api_utils/Api-Route.utils";
import { AuthUser, Gender, User } from "@prisma/client";

export interface RegisterInterface {
  email: string;
  password: string;
}
export interface LoginInterface {
  email: string;
  password: string;
}
export interface GetUser {
  Id: string;
}

export interface ProfileInterface {
  Id: string;
  firstName: string;
  phone: string;
  dob: string;
  lastName: string;
  gender: Gender;
  bio: string;
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
      email: email,
      password: password,
    });
  }

  static async completeProfile(params: ProfileInterface) {
    return await API.post<User, ProfileInterface>(
      "/api/complete-profile",
      params
    );
  }

  static async getUser(Id: string): Promise<User | undefined> {
    return await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ Id }),
    })
      .then(async (res) => {
        if (res.status == 200) {
          return await res.json();
        } else {
          return undefined;
        }
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });
  }
}
