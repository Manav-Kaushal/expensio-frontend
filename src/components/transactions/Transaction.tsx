import React, { useContext } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { GlobalContext } from "@context/GlobalState";
import { numberWithCommas } from "@utils/lib";
import { TransactionProps } from "typings";

dayjs.extend(LocalizedFormat);

export const SingleTransaction = ({ data }: TransactionProps) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = data.amount < 0 ? "-" : "+";

  return (
    <li
      className={`group px-4 py-2 shadow-sm transition duration-200 flex justify-between border-r-4 hover:shadow-md cursor-default rounded-md ${
        data.amount < 0 ? "border-red-500" : "border-green-500"
      }`}
    >
      <div className="flex items-center flex-grow space-x-2">
        {data.createdAt && (
          <>
            <span className="text-xs text-gray-400">
              ({dayjs(data.createdAt).format("lll")})
            </span>
          </>
        )}
        <span className="capitalize">{data.text}</span>
        <XCircleIcon
          className="hidden w-4 h-4 transition duration-200 cursor-pointer hover:text-red-500 group-hover:inline"
          onClick={() => deleteTransaction!(data._id)}
        />
      </div>
      <span className={data.amount < 0 ? "text-red-500" : "text-green-500"}>
        {sign}₹{numberWithCommas(Math.abs(data.amount))}
      </span>
    </li>
  );
};
