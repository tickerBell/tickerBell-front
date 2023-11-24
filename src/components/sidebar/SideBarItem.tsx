'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

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
  const pathname = usePathname();

  return (
    <li>
      <h3>{route.title}</h3>
      <ul>
        {route.submenu.map((item, index) => (
          <li key={index} className="mb-10">
            <Link href={item.route} className={classNames('hover-text', {
              'text-primary': item.route === pathname
            })}>
              <span>- {item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
