import React from "react";
import { SideBarItem } from "./SideBarItem";

const sideData = [
  { type: "title", title: "이벤트", key: "title-tickerBell", route: "" },
  {
    type: "이벤트 내역",
    key: `/detail`,
    route: `/detail`,
  },
  { type: "title", title: "내정보", key: "title-tickerBell", route: "" },
  {
    type: "정보 수정",
    key: `/users`,
    route: `/users`,
  },
];
export const SideBar = () => {
  return (
    <aside className="md:flex w-2/5 md:w-1/4  h-screen flex-col items-center justify-center border-r border-gray-200  ">
      <ul>
        {sideData.map((route) => (
          <SideBarItem key={route.key} route={route} />
        ))}
      </ul>
    </aside>
  );
};
