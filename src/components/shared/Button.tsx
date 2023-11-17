import React from "react";
import { ButtonProps } from "typings";

const getVariant = (variant: string) => {
  switch (variant) {
    case "primary":
      return "bg-blue-500 hover:bg-blue-600";

    default:
      break;
  }
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`h-[36px] px-4 flex items-center justify-center rounded text-white min-w-[80px] focus:outline-none focus:shadow-outline mx-auto w-fit disabled:bg-gray-500 disabled:cursor-not-allowed duration-200 ${getVariant(
        variant
      )} ${size === "sm" ? "text-sm" : "text-base"}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
