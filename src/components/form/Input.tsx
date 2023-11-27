import React, { HTMLProps } from "react";
type InputType = {
  children?: React.ReactNode;
  label?: string;
} & HTMLProps<HTMLInputElement>;

export const Radio = ({ label, ...attr }: InputType) => {
  return (
    <div>
      <label
        htmlFor={attr.id}
        className="flex items-center gap-4 cursor-pointer"
      >
        <span>{label}</span>
        <input type="radio" {...attr} className="cursor-pointe " />
      </label>
    </div>
  );
};

export const Text = ({ label, ...attr }: InputType) => {
  return (
    <div className="flex">
      {label && (
        <label htmlFor={attr.id} className="m-w-80">
          {label}
        </label>
      )}
      <input type="text" {...attr} className="h-26" />
    </div>
  );
};
