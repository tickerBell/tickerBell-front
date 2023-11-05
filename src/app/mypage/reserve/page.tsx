"use client";

import { EventRows, UserRows } from "@/dummyData/DummyData";
import { useEffect, useMemo, useState } from "react";
import { HistoryTable } from "@/components/HistoryTable/HistoryTable";
import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import { SideBar } from "@/components/sidebar/SideBar";
import React from "react";
import { useRecoilValue } from "recoil";
import { userSelector } from "@/recoil/user";
import { userInfoApi } from "../../../api/users";

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
  const getRole = useRecoilValue(userSelector("role"));
  const getAtk = useRecoilValue(userSelector("atk"));
  const [eventRows, setEventRows] = useState([]);

  const columns = getRole === "ROLE_REGISTRANT" ? EventColumns : UserColumns;

  const rows = useMemo(() => {
    if (getRole === "ROLE_REGISTRANT") {
      return EventRows;
    } else {
      return UserRows;
    }
  }, [getRole]);

  useEffect(() => {
    if (getRole === "ROLE_REGISTRANT") {
      userInfoApi(getAtk)
        .then((res) => {
          const eventInfo = res.data.eventInfo;
          setEventRows(eventInfo);
        })
        .catch((error) => {
          console.error("API 호출 중 오류 발생:", error);
        });
    }
  }, [getRole]);

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
