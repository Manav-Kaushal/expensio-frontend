import { cn } from "@utils/lib";
import React from "react";
import { ButtonProps } from "typings";

const Variants = {
  primary: "bg-blue-500/80 hover:bg-blue-500",
  black: "bg-black/80 hover:bg-black",
};

const Positions = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  position = "center",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "h-[36px] px-4 flex items-center justify-center rounded text-white min-w-[80px] focus:outline-none focus:shadow-outline w-fit disabled:bg-gray-500 disabled:cursor-not-allowed duration-200",
        size === "sm" ? "text-sm" : "text-base",
        Variants[variant],
        Positions[position]
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
