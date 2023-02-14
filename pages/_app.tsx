import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AuthProvider } from "@utils/context/AuthContext";
import { GlobalProvider } from "@utils/context/GlobalState";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  // This useEffect is to remove right click from app
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <AuthProvider>
      <GlobalProvider>
        <Toaster />
        <Component {...pageProps} />
      </GlobalProvider>
    </AuthProvider>
  );
}

export default MyApp;
