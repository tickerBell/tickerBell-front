import React from "react";
import { SideBarItem } from "./SideBarItem";

const sideData = {
  to: [
    {
      title: "이벤트",
      submenu: [
        {
          title: "이벤트 내역",
          route: "./reserve",
        },
      ],
    },
    {
      title: "내정보",
      submenu: [
        {
          title: "정보수정",
          route: "./users",
        },
      ],
    },
  ],
  show: [
    {
      title: "이벤트",
      submenu: [
        {
          title: "이벤트 내역",
          route: "./reserve",
        },
      ],
    },
    {
      title: "내정보",
      submenu: [
        {
          title: "정보수정",
          route: "./users",
        },
      ],
    },
  ],
};

export const SideBar = () => {
  const a = "ss"; // 권한은 로그인할때 스토어에 저장.
  return (
    <aside className="md:flex w-2/5 md:w-1/4  h-screen flex-col items-center justify-center border-r border-gray-200  ">
      <ul>
        {a === "ss"
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
