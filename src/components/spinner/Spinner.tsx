import React from "react";
import { ClipLoader } from "react-spinners";
import s from './spinner.module.scss';

type spinnerType = {
  loading?: boolean;
  size?: number;
  type?: string;
}

const Spinner = ({ loading, size = 50, type }: spinnerType) => {
  return (
    <>
      <ClipLoader loading={loading} size={size} aria-label="Loading Spinner" data-testid="loader" className={s.spinner} />
    </>
  );
};

export default Spinner;
