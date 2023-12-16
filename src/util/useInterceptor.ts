"use client";

import { getSession } from "@/hooks/useSeection";
import { userSelector } from "@/recoil/user";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useSetRecoilState } from "recoil";
import { getCookie, removeCookie, setCookie } from "./authCookie";
import { useRouter } from "next/navigation";
import { parseJwt } from "@/hooks/useParseJwt";
import { epochConvert } from "./epochConverter";
import { toast } from "react-toastify";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

apiInstance.interceptors.request.use(
  async (config) => {
    console.log("cc?", getCookie("ticket-atk"), typeof getCookie("ticket-atk"));
    if (typeof getCookie("ticket-atk") === "string") {
      if (epochConvert(parseJwt(getCookie("ticket-atk").exp))) {
        removeCookie("ticket-rtk");
        removeCookie("ticket-atk");
        // window.location.href = '/'
      } else {
        config.headers["Authorization"] = `Bearer ${getCookie("ticket-atk")}`;
        return config;
      }
    }
    // 토큰
    // if (getCookie("ticket-atk") === undefined && getCookie("ticket-trk") !== undefined) {
    //   return config;
    // }
    if (getCookie("ticket-atk") === "undefined") {
      console.log("언디파인드");
      removeCookie("ticket-atk");
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  async function (err) {
    console.log("err", err);

    // 유효하지 않은 토큰
    if (err.response && err.response.status === 400) {
      // const router = useRouter();
      // router.push("/");
      toast.error(`${err.response.data.message}`);
      return err.response.data;
    }

    // atk 만료 or인증실패
    if (err.response && err.response.status === 401) {
      // removeCookie("ticket-atk");
      // 토큰 재발급 요청, apiInstance가 아닌 axios로 요청하기
      removeCookie("ticket-atk");
      if (getCookie("ticket-trk") !== "undefined") {
        console.log("cc", process.env.NEXT_PUBLIC_API_URL);
        console.log("atk: ", getCookie("ticket-atk"));
        console.log("rtk: ", getCookie("ticket-rtk"));
        const data = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reissue`, {
          refreshToken: `${getCookie("ticket-rtk")}`,
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        });
        console.log("갱신", data);
        //  갱신
        removeCookie("ticket-atk");
        setCookie("ticket-atk", `${data.data.accessToken}`);

        // 헤더에 담긴 토큰 값 변경
        err.config.headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.data.accessToken}`,
          // 이 위치에 토큰값 넣기
        };

        // 재요청
        const originalResponse = await axios.request(err.config);
        return originalResponse.data;
      }
      return Promise.reject(err);
    }

    // atk가 undefined일때 500
    if (err.response && err.response.status === 500) {
      // removeCookie("ticket-atk");
    }
    if (err.response && err.response.status === 404) {
      // console.log("err", err.response.data.data);
      //  return Promise.reject(new Error("요청 데이터가 없습니다"));
      // return Promise.reject(err);
      return Promise.resolve();
      // return;
    }
  }
);

export default apiInstance;
