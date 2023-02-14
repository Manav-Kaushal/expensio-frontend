import { GlobalContext } from "@utils/context/GlobalState";
import { numberWithCommas } from "@utils/lib";
import { useContext } from "react";

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(
    (transaction: { amount: number }) => transaction.amount
  );

  const total = amounts
    .reduce((acc: any, item: any) => (acc += item), 0)
    .toFixed(2);

  const sign = total < 0 ? "-" : "";

  return (
    <>
      <h4 className="text-lg font-semibold border-b border-gray-400">
        Balance
      </h4>
      <h1
        className={`text-2xl font-semibold ${
          total < 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        {sign}₹{numberWithCommas(Math.abs(total))}
      </h1>
    </>
  );
};
