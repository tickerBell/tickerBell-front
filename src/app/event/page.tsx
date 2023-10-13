"use client";

import Button from "@/components/button/Button";
import EventForm from "@/components/form/EventForm";
import { Radio } from "@/components/form/Input";
import RegistForm from "@/components/form/RegistForm";
import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Index = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });
  return (
    <>
      <Header />
      <NavTab />
      <div className="flex h-screen max-w-900 m-auto flex-row justify-center items-center">
        <div className="flex items-center flex-col relative">
          <nav className="flex gap-8">
            <Radio name="seatType" id="일반석" label="일반석" />
            <Radio name="seatType" id="특수석" label="특수석" />
          </nav>
          <nav className="flex gap-8">
            <Radio name="ageType" id="모두" label="모두" />
            <Radio name="ageType" id="성인" label="성인" />
            <Radio name="ageType" id="청소년" label="청소년" />
            <Radio name="ageType" id="어린이" label="어린이" />
          </nav>
          <nav className="flex gap-10 mt-10"></nav>
          <EventForm registType="event" />
        </div>
      </div>
    </>
  );
};

export default Index;
