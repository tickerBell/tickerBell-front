import React, { forwardRef, HTMLProps } from "react";
type InputType = {
  children?: React.ReactNode;
  label?: string;
} & HTMLProps<HTMLInputElement>;

export const Radio = ({ label, ...attr }: InputType) => {
  return (
    <div>
      <label
        htmlFor={attr.id}
        className="cursor-pointer flex items-center gap-4"
      >
        <span>{label}</span>
        <input type="radio" {...attr} className="cursor-pointe " />
      </label>
    </div>
  );
};

export const Check = forwardRef<HTMLInputElement, InputType>(
  ({ label, ...attr }, ref) => {
    return (
      <div>
        <label
          htmlFor={attr.id}
          className="cursor-pointer flex items-center gap-4"
        >
          <span>{label}</span>
          <input
            type="checkbox"
            ref={ref}
            {...attr}
            className="cursor-pointer"
          />
        </label>
      </div>
    );
  }
);

export const Number = forwardRef<HTMLInputElement, InputType>(
  ({ label, ...attr }, ref) => {
    return (
      <div>
        <label
          htmlFor={attr.id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          <span>{label}</span>
          <input
            type="number"
            {...attr}
            className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>
    );
  }
);

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
