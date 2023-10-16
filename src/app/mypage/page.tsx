import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import { SideBar } from "@/components/sidebar/SideBar";
import React from "react";

const index = () => {
  return (
    <div>
      <Header />
      <NavTab />
      <SideBar />
      <div>컨텐츠 </div>
    </div>
  );
};

export default index;
