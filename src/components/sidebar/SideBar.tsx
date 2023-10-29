"use client";

import React from "react";
import { SideBarItem } from "./SideBarItem";
import { useRecoilValue } from "recoil";
import { userSelector } from "@/recoil/user";

const sideData = {
  to: [
    {
      title: "이벤트",
      submenu: [
        {
          title: "이벤트 등록내역",
          route: "./reserve",
        },
      ],
    },
    {
      title: "내정보",
      submenu: [
        {
          title: "정보수정",
          route: "./mypage",
        },
      ],
    },
  ],
  show: [
    {
      title: "예약",
      submenu: [
        {
          title: "이벤트 예약내역",
          route: "./reserve",
        },
      ],
    },
    {
      title: "내정보",
      submenu: [
        {
          title: "정보수정",
          route: "./mypage",
        },
      ],
    },
  ],
};

export const SideBar = () => {
  const getRole = useRecoilValue(userSelector("role"));

  return (
    <aside className="flex w-1/4 h-screen flex-col items-center justify-center border-r border-gray-200  ">
      <ul>
        {getRole === "ROLE_REGISTRANT"
          ? sideData.to.map((route, key) => (
              <SideBarItem key={key} route={route} />
            ))
          : sideData.show.map((route, key) => (
              <SideBarItem key={key} route={route} />
            ))}
      </ul>
    </aside>
  );
};
