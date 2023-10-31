"use client";

import { EventRows, UserRows } from "@/dummyData/DummyData";
import { useEffect, useMemo } from "react";
import { HistoryTable } from "@/components/HistoryTable/HistoryTable";
import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import { SideBar } from "@/components/sidebar/SideBar";
import React from "react";
import { useRecoilValue } from "recoil";
import { userSelector } from "@/recoil/user";

export const UserColumns: IUserColumnsData[] = [
  {
    name: "이벤트명",
    speaker: "캐스팅",
    date: "일시",
    place: "장소",
  },
];

export const EventColumns: IEventColumnsData[] = [
  {
    name: "이벤트명",
    speaker: "캐스팅",
    date: "일시",
    place: "장소",
    totaluser: "예매좌수",
    maxseats: "최대좌석",
    cancel: "취소",
  },
];

const Index = () => {
  const getAtk = useRecoilValue(userSelector("atk"));
  const getRole = useRecoilValue(userSelector("role"));

  const columns = getRole === "ROLE_REGISTRANT" ? EventColumns : UserColumns;

  const rows = useMemo(() => {
    if (getRole === "ROLE_REGISTRANT") {
      return EventRows;
    } else {
      return UserRows;
    }
  }, [getRole, getAtk]);

  useEffect(() => {
    console.log(getRole);
  });

  return (
    <>
      <Header />
      <NavTab />
      <main className="flex">
        <SideBar />
        <HistoryTable columns={columns} rows={rows} />
      </main>
    </>
  );
};

export default Index;
