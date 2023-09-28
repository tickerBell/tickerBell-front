import React from "react";
import Link from "next/link";

interface TitleRoute {
  type: string;
  title: string;
  key: string;
}

interface LinkRoute {
  type: string;
  key: string;
  route: string;
}

type Route = TitleRoute | LinkRoute;

interface SideBarItemProps {
  route: Route;
}

export const SideBarItem = ({ route }: SideBarItemProps) => {
  if ("title" in route) {
    return <li>{route.title}</li>;
  }
  return (
    <li>
      <Link href={route.route}>{route.type}</Link>
    </li>
  );
};
