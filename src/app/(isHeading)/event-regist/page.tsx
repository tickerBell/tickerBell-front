"use client";

import Event from "@/components/form/Event";
import { FormProvider, useForm } from "react-hook-form";

const Index = () => {
  const methods = useForm();

  return (
    <div className="flex flex-row items-center justify-center w-full mx-auto mt-20 max-w-1000 mb-60">
      <Event />
    </div>
  );
};

export default Index;
