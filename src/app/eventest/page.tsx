"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  input: string;
}

function Form() {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [values, setValues] = useState<string[]>([]);

  const onSubmit = (data: IFormInput) => {
    const list = data.input.split(",");
    setValues((prevValues) => [...prevValues, ...list]);
    reset();
  };

  const removeValue = (indexToRemove: number) => {
    setValues((prevValues) =>
      prevValues.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    console.log(values.join(", "));
  }, [values]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <input
        {...register("input")}
        placeholder="값을 쉼표로 구분해서 입력하세요"
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        제출
      </button>

      <div className="flex space-x-4">
        {values.map((value, index) => (
          <div
            key={index}
            className="border border-black rounded p-2 flex items-center space-x-2"
          >
            <span>{value}</span>
            <button
              onClick={() => removeValue(index)}
              className="bg-red-500 text-black rounded-full w-5 h-5 flex items-center justify-center"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </form>
  );
}

export default Form;
