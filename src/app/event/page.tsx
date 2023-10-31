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
    <div>
      <Header />
      <NavTab />
      <div className="flex h-screen max-w-900 m-auto flex-row justify-center items-center">
        <div className="flex items-center flex-col relative">
          <EventForm registType="event" />
        </div>
      </div>
    </div>
  );
};

export default Index;
