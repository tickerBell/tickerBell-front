"use client";

import { eventApi } from "@/api/events";
import EventForm from "@/components/form/EventForm";
import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import axios from "axios";
import React, { useEffect, useState } from "react";

type EventItem = {
  category: string;
  eventName: string;
};

type DataType = EventItem[];

const Index = () => {
  const [data, setData] = useState<DataType | null>(null);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventApi();
        setData(response);
        console.log(response); // 응답 데이터 확인을 위한 콘솔 출력
        // 추가적인 로직 수행 가능
      } catch (error) {
        console.error(error); // 에러 처리
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Header />
      <NavTab />
      {data?.map((item, key) => (
        <div key={key}>
          <p>ID: {item.category}</p>
          <p>Name: {item.eventName}</p>
        </div>
      ))}
      <div className="flex h-screen max-w-900 m-auto flex-row justify-center items-center">
        <div className="flex items-center flex-col relative">
          <nav className="flex gap-8">
            <Radio name="seatType" id="일반석" label="일반석" />
            <Radio name="seatType" id="특수석" label="특수석" />
          </nav>
          <nav className="flex gap-8">
            <Radio name="ageType" id="모두" label="모두" />
            <Radio name="ageType" id="성인" label="성인" />
            <Radio name="ageType" id="청소년" label="청소년" />
            <Radio name="ageType" id="어린이" label="어린이" />
          </nav>
          <nav className="flex gap-10 mt-10"></nav>
          <EventForm registType="event" />
        </div>
      </div>
    </>
  );
};

export default Index;
