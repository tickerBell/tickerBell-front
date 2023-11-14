import React, { useState } from 'react'
import { TabData } from './TabData';
import { twMerge } from "tailwind-merge";
import classNames from 'classnames';

type tabThemeType = {
  [key: string]: string;
};

const TabTheme: tabThemeType = {
  mainTab: '',
  historyTableTab: 'flex justify-around'
}

const TabItemTheme: tabThemeType = {
  mainTabItem: "bg-primary text-white cursor-pointer",
  historyTableTabItem: "hover:bg-opacity-50 hover:bg-primary hover:text-white cursor-pointer text-[14px] border round-6 px-10 py-4",
};

type tabType = {
  tabName: 'main' | 'historyTable';
  className?: string;
};

const Tab = ({ tabName, className }: tabType) => {
  const [select, setSelect] = useState(-1);
  const mainThemeObject: any = TabData?.find(item => item.theme === tabName);
  const menuNameOfMainTheme = mainThemeObject ? mainThemeObject.menuName : [];

  return (
    <div className={classNames(twMerge(
      `${TabTheme[tabName + `Tab`]} `, className
    ))}>
      {menuNameOfMainTheme.map((item: string, index: any) => (
        <div key={index} className={classNames(twMerge(
          `${TabItemTheme[tabName + `TabItem`]}`
        ), { 'bg-primary text-white': select === index })}
          onClick={() => setSelect(index)}
        >{item}</div>
      ))}
    </div>
  )
}

export default Tab