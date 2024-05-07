import { create } from "zustand";
import { LoginRequest, RegisterRequest } from "../models/AuthModels";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set: any, get: any) => ({
      isLoggedIn: get()?.isLoggedIn || false,
      user: get()?.user || {},
      register: async (user: RegisterRequest) => {
        console.log(user);
        // const data = await AuthController.register(user);
        // if (data.status) {
        //   set({ isLoggedIn: true, user: data?.response });
        // }
        // return data;
      },
      logIn: async (payload: LoginRequest) => {
        console.log(payload);
        // const data = await AuthController.login(
        //   payload.auth_type,
        //   payload.user_key
        // );
        // if (!data?.status) {
        //   return null;
        // }
        // set({ isLoggedIn: true, user: data?.response || {} });
        // return data;
      },
      logOut: () => set(() => ({ isLoggedIn: false, user: {} })),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
