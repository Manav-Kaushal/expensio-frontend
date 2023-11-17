import useAuth from "@context/AuthContext";
import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import Logo from "@components/shared/Logo";
import { useRouter } from "next/router";
import { Balance } from "@components/transactions/Balance";
import { IncomeExpenses } from "@components/transactions/IncomeExpenses";
import { AddTransaction } from "@components/transactions/AddTransaction";
import { TransactionList } from "@components/transactions/TransactionList";

const Home: NextPage = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
      </Head>
      <div className="fixed top-0 left-0 flex items-center justify-between w-full gap-4 px-4 py-1 select-none">
        <Logo className="aspect-[2/1] w-32" />
        <div className="flex items-center space-x-4 text-white">
          <button
            onClick={() => {
              logout();
            }}
            className="hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="h-full max-w-screen-xl mx-auto">
          <div className="flex flex-col items-start justify-center h-full">
            <h1 className="mb-2 text-2xl text-white/75">
              Logged in as - {user?.email?.toLowerCase()}
            </h1>
            <div className="relative grid w-full grid-cols-1 gap-8 p-4 bg-white rounded-md shadow-md sm:grid-cols-2">
              <div className="space-y-4">
                <Balance />
                <IncomeExpenses />
                <AddTransaction />
              </div>
              <div>
                <TransactionList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
