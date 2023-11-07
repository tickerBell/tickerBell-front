"use client";

import { userInfoApi, userReserveApi } from "@/api/users";
import { getSession } from "@/hooks/useSeection";
import { userSelector } from "@/recoil/user";
import { getCookie } from "@/util/authCookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import { SideBar } from "@/components/sidebar/SideBar";
import React from "react";

type User = {
  username: string;
  phone: string;
};

const Index = () => {
  const getRole = useRecoilValue(userSelector("role"));
  const setIsLogin = useSetRecoilState(userSelector("isLogin"));
  const getIsLogin = useRecoilValue(userSelector("isLogin"));
  const [atk, setAtk] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    setAtk(getCookie("ticket-atk"));
    setIsLogin(getCookie("ticket-atk") !== null ? true : false);
    userInfoApi(getCookie("ticket-atk")).then((res) => {
      setUserData(res?.data);
      console.log("re정보: ", res);
    });
  }, []);

  return (
    <div>
      <Header />
      <NavTab />
      <div className="flex">
        <SideBar />
        <div>
          {userData && (
            <div>
              <p>사용자 이름: {userData.username}</p>
              <p>휴대폰 번호: {userData.phone}</p>
            </div>
          )}
          {/* 나머지 컨텐츠 내용 */}
        </div>
      </div>
    </div>
  );
};

export default Index;
