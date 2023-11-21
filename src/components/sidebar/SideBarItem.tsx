'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SubmenuItem = {
  title: string;
  route: string;
};

type MenuItem = {
  title: string;
  submenu: SubmenuItem[];
};

type SideBarItemProps = {
  route: MenuItem;
};

export const SideBarItem = ({ route }: SideBarItemProps) => {
  const router = useRouter();
  console.log('사이드메뉴', router);


  return (
    <li>
      <h3>{route.title}</h3>
      <ul>
        {route.submenu.map((item, index) => (
          <li key={index} className="mb-10">
            <Link href={item.route} className="hover-text">
              <span>- {item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
