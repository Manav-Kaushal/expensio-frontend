import axiosClient from "@utils/axiosClient";
import { cookieNames } from "@utils/config";
import {
  clearAllStorage,
  redirectToLocation,
  setCookieValue,
  setLocalStorage,
} from "@utils/lib";
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import useLocalStorage from "@utils/hooks/useLocalStorage";
import { AuthContentProps, UserProps } from "typings";

export const AuthContext = createContext<AuthContentProps>({
  isAuthenticated: false,
  isAuthenticating: false,
  signingUp: false,
  user: {},
  login: async ({ email, password, redirectUrl }) => {},
  register: async ({ name, email, password, redirectUrl }) => {},
  logout: async () => {},
});

// const endPointAuthCheck = "/auth/check";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useLocalStorage<Partial<UserProps>>("session", {});
  const [signingUp, setSigningUp] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const login = async ({
    email,
    password,
    redirectUrl = "/",
  }: {
    email: string;
    password: string;
    redirectUrl?: string;
  }) => {
    clearAllStorage(cookieNames.token);
    setAuthenticating(true);
    axiosClient
      .post(`/auth/login`, { email, password })
      .then((response) => {
        const { token, userData, message } = response.data;
        setCookieValue(cookieNames.token, token);
        setUser(userData);
        setAuthenticating(false);
        toast.success(message);
        router.push(redirectUrl);
      })
      .catch((error) => {
        if (error.response) {
          setAuthenticating(false);
          toast.error(error.response.data.message);
          return {
            error: true,
            message: error.response.data.message,
            hasAttempted: true,
          };
        }
      })
      .finally(() => setAuthenticating(false));
  };

  const register = async ({
    name,
    email,
    password,
    redirectUrl = "/login",
  }: {
    name: string;
    email: string;
    password: string;
    redirectUrl?: string;
  }) => {
    setSigningUp(true);
    const response = await axiosClient.post("/auth/register", {
      name,
      email,
      password,
    });
    if (response.status <= 301) {
      toast.success(response.data.message);
      setSigningUp(false);
      setTimeout(() => router.push(redirectUrl), 500);
    } else {
      setAuthenticating(false);
      setSigningUp(false);
    }
  };

  async function logout() {
    clearAllStorage(cookieNames.token);
    setLocalStorage("logout", Date.now().toString());
    setUser({});
    redirectToLocation({
      router,
      pathname: "/login",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user._id,
        isAuthenticating: authenticating,
        user,
        login,
        logout,
        register,
        signingUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
