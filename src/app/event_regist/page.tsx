"use client";

import Event from "@/components/form/Event";
import EventForm from "@/components/form/EventForm";
import FileUpload from "@/components/form/File";
import { Images } from "@/components/form/images";
import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type EventItem = {
  category: string;
  eventName: string;
};

type DataType = EventItem[];

const Index = () => {
  const methods = useForm();
  const [data, setData] = useState<DataType | null>(null);

  return (
    <div>
      <Header />
      <NavTab />
      <div className="flex mt-96 h-screen w-full max-w-1000 m-auto flex-row justify-center items-center">
        {/* <EventForm registType="event" /> */}
        <FormProvider {...methods}>
          <Event />
        </FormProvider>
      </div>
    </div>
  );
};

export default Index;
