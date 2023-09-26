import { DataTable } from "@/components/DataTable/DataTable";
import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import { SideBar } from "@/components/sidebar/SideBar";
import React from "react";

const index = () => {
  return (
    <>
      <Header />
      <NavTab />
      <main className="flex">
        <SideBar />
        <DataTable />
      </main>
    </>
  );
};

export default index;
