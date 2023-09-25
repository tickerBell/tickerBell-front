import React from "react";
import { SideBarItem } from "./SideBarItem";

const sideData = [
  { type: "title", title: "이벤트", key: "title-tickerBell" },
  {
    name: "홍길동",
    type: "이벤트 내역",
    key: `/detail`,
    route: `/detail`,
  },
  { type: "title", title: "내정보", key: "title-tickerBell" },
  {
    name: "권혁수",
    type: "정보 수정",
    key: `/users`,
    route: `/users`,
  },
];
export const SideBar = () => {
  return (
    <aside>
      <ul className="flex h-screen w-240 flex-col items-center justify-center border-r border-gray-200  ">
        {sideData.map((route) => (
          <SideBarItem key={route.key} route={route} />
        ))}
      </ul>
    </aside>
  );
};
