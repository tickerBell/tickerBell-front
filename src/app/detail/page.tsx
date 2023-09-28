import { EventColumns, EventRows } from "@/dummyData/DummyData";
import { useMemo } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import { SideBar } from "@/components/sidebar/SideBar";
import React from "react";

const Index = () => {
  const columns = useMemo(() => EventColumns, []);
  const rows = useMemo(() => EventRows, []);
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
