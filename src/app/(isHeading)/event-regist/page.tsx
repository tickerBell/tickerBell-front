"use client";

import Event from "@/components/form/Event";
import { FormProvider, useForm } from "react-hook-form";

const Index = () => {
  const methods = useForm();

  return (
    <div className="flex w-full max-w-1000 mx-auto mt-20 mb-60 flex-row justify-center items-center">
      {/* <EventForm registType="event" /> */}
      {/* <FormProvider {...methods}> */}
        <Event />
      {/* </FormProvider> */}
    </div>
  );
};

export default Index;
