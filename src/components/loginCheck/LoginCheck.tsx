"use client";

import { userInfoApi } from '@/api/users';
import { parseJwt } from '@/hooks/useParseJwt';
import { userSelector } from '@/recoil/user';
import { getCookie, removeCookie } from '@/util/authCookie';
import { epochConvert } from '@/util/epochConverter';
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { useRouter } from "next/navigation";

// 로그인 체크용 컴포넌트
const LoginCheck = () => {
  const setIsLogin = useSetRecoilState(userSelector("isLogin"));
  const setRole = useSetRecoilState(userSelector("role"));
  const router = useRouter();

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
    function chk() {
      if (getCookie("ticket-atk")) {
        setIsLogin(getCookie("ticket-atk") === undefined ? false : true);
      }
      if (getCookie('ticket-rtk')) {
        // console.log('현재 날짜가 만료시간보다 이전임 : ',
        //   epochConvert(parseJwt(getCookie('ticket-rtk').exp))
        // )
        if (!epochConvert(parseJwt(getCookie('ticket-rtk').exp))) {
          removeCookie('ticket-rtk');
          removeCookie('ticket-atk');
          router.push('/');
        }
      }
    }
    chk();
    return () => {
      // console.log('2');
      chk();
    }
  }, [])

  return null;
}

export default LoginCheck