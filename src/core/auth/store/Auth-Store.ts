import { AuthUser, User } from "@prisma/client";
import { create } from "zustand";
import { RegisterInterface } from "../services/Auth-Services";
import AuthenticationServices, {
  LoginInterface,
} from "../services/Auth-Services";
import { produce } from "immer";

const initialState = {
  authUser: undefined,
  userData: undefined,
};

type State = {
  authUser: AuthUser | undefined;
  userData: User | undefined;
};

type Action = {
  setAuthUser: (authUser: AuthUser) => void;

  // registerUserData: (user: User) => Promise<User | undefined>;
  logout: () => void;
};

export const useAuthStore = create<State & Action>((set, get) => ({
  ...initialState,

  // registerUserData: (user) => {
  //   set({ ...get(), userData: user });
  //   return user;
  // },
  logout: () => set(initialState),
  setAuthUser: (authUser) => {
    set(
      produce((state) => {
        state.authUser = authUser;
        return state;
      })
    );
  },
}));
