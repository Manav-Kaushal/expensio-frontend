import { GlobalContext } from "@context/GlobalState";
import { numberWithCommas } from "@utils/lib";
import { useContext } from "react";

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <div className="flex justify-between px-12 py-4 text-lg border rounded-md shadow-md">
      <div>
        <h4>Income</h4>
        <p className="font-semibold text-green-500">
          ₹{numberWithCommas(income)}
        </p>
      </div>
      <div className="border-r border-gray-200 h-15" />
      <div>
        <h4>Expense</h4>
        <p className="font-semibold text-red-500">
          ₹{numberWithCommas(expense)}
        </p>
      </div>
    </div>
  );
};
