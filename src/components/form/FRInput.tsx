import React, { forwardRef, HTMLProps, useEffect, useState } from "react";
type InputType = {
  children?: React.ReactNode;
  label?: string;
  className?: string;
} & HTMLProps<HTMLInputElement>;

const FRInput = forwardRef<HTMLInputElement, InputType>(
  ({ label, type, className, ...attr }, ref) => {
    const [money, setMoney] = useState("");

    const onChangePoints = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      value = value.replace(/,/g, "");
      setMoney(addComma(value));
    };

    const addComma = (num: string) => {
      const numValue = Number(num);
      return !isNaN(numValue) ? numValue.toLocaleString("ko-KR") : "";
    };
    return (
      <div>
        <label htmlFor={attr.id}>
          <span className="cursor-pointer">{label}</span>
          <input
            className={`w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ${className}`}
            type={type}
            ref={ref}
            onChange={onChangePoints}
            value={money || ""}
            {...attr}
          />
        </label>
      </div>
    );
  }
);

FRInput.displayName = "FRInput";
export default FRInput;
