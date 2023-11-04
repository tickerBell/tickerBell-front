"use client";

import React from "react";
import { SideBarItem } from "./SideBarItem";
import { useRecoilValue } from "recoil";
import { userSelector } from "@/recoil/user";
import { sideData } from "./SideBarMenu";
import LogoutButton from "../button/LogoutButton";

export const SideBar = () => {
  const getRole = useRecoilValue(userSelector("role"));
  console.log(getRole);

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
      <LogoutButton />
    </aside>
  );
};
