export const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";

export const page = {
  appName: "Expensio",
  apiBaseUrl: isProduction
    ? "https://expensio-backend.vercel.app/api"
    : "http://localhost:5000/api",
};

export const cookieNames = {
  token: "token",
  userRole: "role",
};
