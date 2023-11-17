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
