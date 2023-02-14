import { GlobalContext } from "@utils/context/GlobalState";
import { useContext, useEffect } from "react";
import { SingleTransaction } from "./Transaction";

export const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions!();
  }, []);

  return (
    <div className="space-y-3">
      <h4 className="mr-6 text-lg font-semibold border-b border-gray-400">
        History
      </h4>
      <ul className="space-y-2 overflow-y-scroll max-h-[380px] pr-6">
        {!!transactions?.length ? (
          <>
            {transactions.map((transaction) => (
              <SingleTransaction key={transaction._id} data={transaction} />
            ))}
          </>
        ) : (
          <p className="text-gray-400">
            No transactions logged! Please add a transaction.
          </p>
        )}
      </ul>
    </div>
  );
};
