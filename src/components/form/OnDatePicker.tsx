import dayjs from "dayjs";
import React from "react";
import { Controller, Control } from "react-hook-form";
import DatePicker from "react-datepicker";

interface Props {
  control: Control<any>;
  name: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  rules?: any;
}

export const OnDatePicker = ({
  control,
  name,
  minDate,
  maxDate,
  rules,
  ...rest
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      // rules={rules}
      render={({ field }) => (
        <DatePicker
          {...field}
          {...rest}
          className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
          showTimeSelect
          dateFormat="yy년 MM월 dd일 aa h시 mm분"
          selected={field.value ? dayjs(field.value).toDate() : null}
          onChange={(date) => field.onChange(dayjs(date).toDate())}
          minDate={minDate ? new Date(minDate) : undefined}
          maxDate={maxDate ? new Date(maxDate) : undefined}
        />
      )}
    />
  );
};
