import React from "react";

type TagField = {
  id: string;
  name: string;
};

type props = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  fields: TagField[];
  remove: (index: number) => void;
};

export const InputField = ({
  label,
  id,
  placeholder,
  onKeyDown,
  fields,
  remove,
}: props) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
        onKeyDown={onKeyDown}
      />
      <div className="flex flex-row">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-2 mt-2">
            <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-900">
              {field.name}
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-black bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center"
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
