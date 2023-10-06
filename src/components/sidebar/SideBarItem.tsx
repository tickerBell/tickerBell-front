import React from "react";
import Link from "next/link";

type SubmenuItem = {
  title: string;
  route: string;
};

type MenuItem = {
  title: string;
  route: string;
  submenu: SubmenuItem[];
};

type SideBarItemProps = {
  route: MenuItem;
};

export const SideBarItem = ({ route }: SideBarItemProps) => {
  console.log("cc", route);
  // if ("title" in route) {
  //   return <li>{route.title}</li>;
  // }
  return (
    <>
      {
        // route.submenu.map()
      }
    </>
  );
};
