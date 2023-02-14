import Image from "next/image";
import React from "react";
import { LogoProps } from "typings";

const Logo = ({
  className,
  variant = "white",
  center,
  ...props
}: LogoProps) => {
  return (
    <div className={`relative ${className}  ${center && "mx-auto"}`} {...props}>
      <Image
        src={
          variant === "white"
            ? "https://res.cloudinary.com/manavkaushal/image/upload/v1676112601/Projects/expensio_expense_tracker/expensio_logo_white_1_fodetm.png"
            : "https://res.cloudinary.com/manavkaushal/image/upload/v1676113172/Projects/expensio_expense_tracker/expensio_logo_black_mlnzkz.png"
        }
        alt="Expensio Logo"
        className="object-contain"
        fill
      />
    </div>
  );
};

export default Logo;
