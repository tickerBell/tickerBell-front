import React, { forwardRef, HTMLProps } from "react";
type InputType = {
  children?: React.ReactNode;
  label?: string;
  className?: string;
} & HTMLProps<HTMLInputElement>;

const FRInput = forwardRef<HTMLInputElement, InputType>(
  ({ label, type, className, ...attr }, ref) => {
    const inputClass = "hidden peer";
    const labelClass = `group hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm ${className}`;

    return (
      <div>
        <label htmlFor={attr.id} className={labelClass}>
          <span className="cursor-pointer">{label}</span>
          <input className={inputClass} type={type} ref={ref} {...attr} />
        </label>
      </div>
    );
  }
);

FRInput.displayName = "FRInput";
export default FRInput;
