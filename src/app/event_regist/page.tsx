"use client";

import Event from "@/components/form/Event";
import EventForm from "@/components/form/EventForm";
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
      <div className="flex h-screen max-w-900 m-auto flex-row justify-center items-center">
        <div className="flex items-center flex-col relative">
          {/* <EventForm registType="event" /> */}
          <Event />
        </div>
      </div>
    </div>
  );
};

export default Index;
