import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React, { ReactNode, useState } from "react";
import { InputFieldProps } from "typings";

const InputField = ({
  name,
  label,
  type = "text",
  icon,
  ...props
}: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold text-gray-700" htmlFor={name}>
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type={isPasswordVisible ? "text" : type}
          id={name}
          name={name}
          className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-sky-500 transition-all duration-200 ease-in-out ${
            icon?.right && "pr-10 "
          }`}
          {...props}
        />
        {type === "password" && (
          <div className="absolute inset-y-0 right-0 flex items-center pl-3 pr-3 bg-gray-200 cursor-pointer">
            {isPasswordVisible ? (
              <EyeSlashIcon
                className="w-5 h-5 text-black"
                onClick={() => setIsPasswordVisible(false)}
              />
            ) : (
              <EyeIcon
                className="w-5 h-5 text-black"
                onClick={() => setIsPasswordVisible(true)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
