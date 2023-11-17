import React, { useContext } from "react";
import { TrashIcon, XCircleIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { GlobalContext } from "@context/GlobalState";
import { cn, numberWithCommas } from "@utils/lib";
import { TransactionProps } from "typings";

dayjs.extend(LocalizedFormat);

export const SingleTransaction = ({ data }: TransactionProps) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = data.amount < 0 ? "-" : "+";

  return (
    <li
      className={`group px-4 py-2 duration-200 flex items-center justify-between shadow ${
        data.amount < 0 ? "border-red-500" : "border-green-500"
      }`}
    >
      <div className="">
        <span className="text-xs text-gray-400">
          {dayjs(data.createdAt).format("lll")}
        </span>
        <div className="flex items-center gap-x-2">
          <p className="text-sm capitalize">{data.text}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <TrashIcon
          className="hidden w-4 h-4 transition duration-200 cursor-pointer hover:text-red-500 group-hover:inline"
          onClick={() => deleteTransaction!(data._id)}
        />

        <span
          className={cn(
            "text-lg",
            data.amount < 0 ? "text-red-500" : "text-green-500"
          )}
        >
          {sign}₹{numberWithCommas(Math.abs(data.amount))}
        </span>
      </div>
    </li>
  );
};
