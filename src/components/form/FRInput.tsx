import React, { forwardRef, HTMLProps } from "react";
type InputType = {
  children?: React.ReactNode;
  label?: string;
  className?: string;
} & HTMLProps<HTMLInputElement>;

const FRInput = forwardRef<HTMLInputElement, InputType>(
  ({ label, type, className, ...attr }, ref) => {
    const inputClass =
      type !== "number"
        ? "peer hidden w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        : "w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer";

    return (
      <div>
        <label htmlFor={attr.id}>
          <span className="cursor-pointer">{label}</span>
          <input className={inputClass} type={type} ref={ref} {...attr} />
        </label>
      </div>
    );
  }
);

FRInput.displayName = "FRInput";
export default FRInput;
