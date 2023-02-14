import { cookieNames } from "@utils/config";

type CookieKey = cookieNames.token;

// Transaction
type Transaction = {
  _id: string;
  text: string;
  amount: number;
  user: string;
  createdAt: string;
  updatedAt: string;
};

type TransactionProps = {
  data: Transaction;
};

// User
type UserProps = {
  _id: string;
  email: string;
  name: string;
};

// Global Context
type GlobalStateProps = {
  transactions: Transaction[];
  error: boolean | null;
  loading: boolean;
  deleteTransaction?: (id: string) => Promise<void>;
  addTransaction?: (transaction: any) => Promise<void>;
  getTransactions?: () => {};
};

// Auth Context
type AuthContentProps = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  signingUp: boolean;
  user: Partial<UserProps>;
  login: (
    email: string,
    password: string,
    redirectUrl?: string
  ) => Promise<void>;
  register: ({
    name,
    email,
    password,
    redirectUrl,
  }: {
    name: string;
    email: string;
    password: string;
    redirectUrl?: string;
  }) => {
    error: false;
    message: "";
    hasAttempted: false;
  };
  logout: () => {};
};

//! Components

// Button
interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  type?: "submit" | "button";
  variant?: "primary";
  size?: "sm" | "md" | "lg";
}

// Input Field
type InputFieldProps = {
  name: string;
  label: string;
  type: "text" | "password";
  icon: ReactNode;
};

// Logo
type LogoProps = {
  className?: string;
  variant?: "white" | "black";
  center?: boolean;
};
