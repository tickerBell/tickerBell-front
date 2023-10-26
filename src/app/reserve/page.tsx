"use client";

import {
  EventColumns,
  EventRows,
  UserColumns,
  UserRows,
} from "@/dummyData/DummyData";
import { useMemo } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import { SideBar } from "@/components/sidebar/SideBar";
import React from "react";
import { useRecoilValue } from "recoil";
import { userSelector } from "@/recoil/user";

const Index = () => {
  const getAtk = useRecoilValue(userSelector("atk"));
  const getRole = useRecoilValue(userSelector("role"));

  const columns =
    getRole === "ROLE_REGISTRANT"
      ? useMemo(() => EventColumns, [])
      : useMemo(() => UserColumns, []);
  const rows =
    getRole === "ROLE_REGISTRANT"
      ? useMemo(() => EventRows, [])
      : useMemo(() => UserRows, []);

  return (
    <>
      <Header />
      <NavTab />
      <main className="flex">
        <SideBar />
        <DataTable columns={columns} rows={rows} />
      </main>
    </>
  );
};

export default Index;
