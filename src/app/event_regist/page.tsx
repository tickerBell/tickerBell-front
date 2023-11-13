"use client";

import Event from "@/components/form/Event";
import EventForm from "@/components/form/EventForm";
import FileUpload from "@/components/form/File";
import { Images } from "@/components/form/images";
import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import { useState } from "react";

type EventItem = {
  category: string;
  eventName: string;
};

type DataType = EventItem[];

const Index = () => {
  const [data, setData] = useState<DataType | null>(null);

  return (
    <div>
      <Header />
      <NavTab />
      <div className="flex mt-96 h-screen w-full max-w-1000 m-auto flex-row justify-center items-center">
        {/* <EventForm registType="event" /> */}
        <Event />
      </div>
    </div>
  );
};

export default Index;
