"use client";

import { userInfoApi } from '@/api/users';
import { userSelector } from '@/recoil/user';
import { getCookie } from '@/util/authCookie';
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil';

// 로그인 체크용 컴포넌트
const LoginCheck = () => {
  const setIsLogin = useSetRecoilState(userSelector("isLogin"));
  const setRole = useSetRecoilState(userSelector("role"));

  // console.log('type', typeof getCookie("ticket-atk"), getCookie("ticket-atk")?.name)
  useEffect(() => {
    // setAtk(getCookie("ticket-atk"));
    // if (getCookie("ticket-atk")) {
    //   setIsLogin(getCookie("ticket-atk") === undefined ? false : true);
    // }
    // userInfoApi(getCookie("ticket-atk")).then((res) =>
    //   setRole(res?.data.role)
    // );
    // return () => {
    //   userInfoApi(getCookie("ticket-atk")).then((res) =>
    //     setRole(res?.data.role)
    //   );
    // }
  }, []);

  useEffect(() => {
    if (getCookie("ticket-atk")) {
      setIsLogin(getCookie("ticket-atk") === undefined ? false : true);
    }
    return () => {
      // console.log('2');
      if (getCookie("ticket-atk")) {
        setIsLogin(getCookie("ticket-atk") === undefined ? false : true);
      }
    }
  }, [])

  return null;
}

export default LoginCheck