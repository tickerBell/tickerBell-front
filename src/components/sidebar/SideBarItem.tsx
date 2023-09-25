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
  const isDetailPage = route.key.includes("/detail");
  const isUsersPage = route.key.includes("/users");

  if (route.type === "title") {
    return <li>{route.title}</li>;
  }
  return (
    <li>
      <Link href={route.route}>{route.type}</Link>
    </li>
  );
};
