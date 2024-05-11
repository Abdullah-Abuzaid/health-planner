import { AuthUser, User } from "@prisma/client";
import { create } from "zustand";
import { ProfileInterface, RegisterInterface } from "../services/Auth-Services";
import AuthenticationServices, {
  LoginInterface,
} from "../services/Auth-Services";
import { persist } from "zustand/middleware";
import { ApiResponse } from "@/core/api_utils/Api-Route.utils";

const initialState = {
  authUser: undefined,
  userData: undefined,
};

type State = {
  authUser: AuthUser | undefined;
  userData: User | undefined;
};

type Action = {
  saveProfileData: (data: ProfileInterface) => Promise<ApiResponse<User>>;
  getProfileData: () => any;
  registerAuthUser: ({
    email,
    password,
  }: RegisterInterface) => Promise<ApiResponse<AuthUser>>;
  login: ({
    email,
    password,
  }: LoginInterface) => Promise<ApiResponse<AuthUser>>;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Action>(
    (set, get) => ({
      ...initialState,

      registerAuthUser: async (user) => {
        const data = await AuthenticationServices.register(user);
        return data;
      },
      login: async (user) => {
        const loginData = await AuthenticationServices.login(user);

        if (loginData.succeeded) {
          const userData = await AuthenticationServices.getUser(
            loginData.data!.Id
          );

          if (userData) {
            set({ ...get(), authUser: loginData.data!, userData: userData });
          }
          set({ ...get(), authUser: loginData.data! });
        }
        return loginData;
      },
      saveProfileData: async (data: ProfileInterface) => {
        const response = await AuthenticationServices.completeProfile(data);

        if (response.succeeded) {
          set({ ...get(), userData: response.data! });
        }
        return response;
      },

      logout: () => {
        set(initialState);
      },
      getProfileData: () => {
        return {
          phone: get().userData?.phone,
          bio: get().userData?.bio,
          gender: get().userData?.gender,
          dob: get().userData?.dateOfBirth,
          firstName: get().userData?.fullName?.split(" ")[0],
          lastName: get().userData?.fullName?.split(" ")[1],
        };
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
