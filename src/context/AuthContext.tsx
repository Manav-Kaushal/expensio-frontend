import axiosClient from "@utils/axiosClient";
import { cookieNames } from "@utils/config";
import useLocalStorage from "@utils/hooks/useLocalStorage";
import { clearAllStorage, redirectToLocation, setCookie } from "@utils/lib";
import { useRouter } from "next/router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { AuthContentProps, UserProps } from "typings";

export const AuthContext = createContext<AuthContentProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useLocalStorage<Partial<UserProps>>("session", {});

  // const register = async ({
  //   name,
  //   email,
  //   password,
  //   setSubmitting,
  //   redirectUrl = "/login",
  // }: {
  //   name: string;
  //   email: string;
  //   password: string;
  //   setSubmitting: (isSubmitting: boolean) => void;
  //   redirectUrl?: string;
  // }) => {
  //   try {
  //     const response = await axiosClient.post("/auth/register", {
  //       name,
  //       email,
  //       password,
  //     });
  //     toast.success(response.data.message);
  //     setTimeout(() => router.push(redirectUrl), 500);
  //   } catch (error) {
  //     toast.error("Registration failed. Please try again.");
  //   }
  // };

  async function logout() {
    clearAllStorage(cookieNames.token);
    setUser({});
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
