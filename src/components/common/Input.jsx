import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const Input = ({
  label,
  icon: Icon,
  error,
  touched,
  className = "",
  id,
  type = "text", // Default type
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isError = touched && error;

  const baseInputStyles = `
    w-full bg-white/5 border rounded-xl py-3 text-white transition-all outline-none
    ${Icon ? "pl-10" : "pl-4"} pr-12
    ${
      isError
        ? "border-red-500/50 focus:border-red-500 ring-1 ring-red-500/20"
        : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/20"
    }
  `;

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            id={id}
            className={`${baseInputStyles} min-h-30 resize-none`}
            {...props}
          />
        );

      case "password":
        return (
          <div className="relative w-full">
            <input
              id={id}
              // Toggle type between 'password' and 'text'
              type={showPassword ? "text" : "password"}
              className={baseInputStyles}
              {...props}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors z-20 p-1"
            >
              {showPassword ? (
                <HiOutlineEyeOff size={20} />
              ) : (
                <HiOutlineEye size={20} />
              )}
            </button>
          </div>
        );

      default:
        return (
          <input id={id} type={type} className={baseInputStyles} {...props} />
        );
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-300 ml-1 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10
              ${isError ? "text-red-400" : "text-gray-500"}`}
          >
            <Icon size={20} />
          </div>
        )}

        {renderInput()}
      </div>

      {isError && (
        <span className="text-xs text-red-400 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
