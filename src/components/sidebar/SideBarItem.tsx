import React from "react";
import Link from "next/link";

interface Route {
  type: string;
  title?: string;
  name?: string;
  key: string;
  route: string;
}

interface SideBarItemProps {
  route: Route;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({ route }) => {
  if (route.type === "title") {
    return <li>{route.title}</li>;
  }
  return (
    <li>
      <Link href={route.route}>{route.type}</Link>
    </li>
  );
};
