import { createContext, ReactNode, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import { page } from "@utils/config";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import axiosClient from "@utils/axiosClient";
import { GlobalStateProps } from "typings";

// Initial State
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext<GlobalStateProps>(initialState);

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const res = await axiosClient.get(`/v1/transactions`);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err: any) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.error,
      });
    }
  }

  async function deleteTransaction(id: string) {
    try {
      await axiosClient.delete(`/v1/transactions/${id}`);
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    } catch (err: any) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.error,
      });
    }
  }

  async function addTransaction(transaction: any) {
    try {
      const res = await axiosClient.post(
        `/v1/transactions`,
        JSON.stringify({
          ...transaction,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "ADD_TRANSACTION", payload: res.data.data });
    } catch (err: any) {
      toast.error(err.response.data.error[0]);
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        getTransactions,
        error: state.error,
        loading: state.loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
