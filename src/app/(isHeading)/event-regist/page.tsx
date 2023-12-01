"use client";

import Event from "@/components/form/Event";
import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import { FormProvider, useForm } from "react-hook-form";

const Index = () => {
  const methods = useForm();

  return (
    <div className="flex h-screen w-full max-w-1000 m-auto flex-row justify-center items-center">
      {/* <EventForm registType="event" /> */}
      <FormProvider {...methods}>
        <Event />
      </FormProvider>
    </div>
  );
};

export default Index;
