import { getSession } from "@/hooks/useSeection";
import { userSelector } from "@/recoil/user";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { getCookie, setCookie } from "./authCookie";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

apiInstance.interceptors.request.use(
  async (config) => {
    if (getCookie("ticket-atk")) {
      config.headers["Authorization"] = `Bearer ${getCookie("ticket-atk")}`;
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
    // 유효하지 않은 토큰
    if (err.response && err.response.status === 400) {
    }

    // 인증실패
    if (err.response && err.response.status === 401) {
      // 토큰 재발급 요청, apiInstance가 아닌 axios로 요청하기
      const data = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reissue`, {
        refreshToken: getCookie("ticket-rtk"),
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      //  갱신
      setCookie('ticket-atk', `${data.data.accessToken}`)
      // data.data.

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
);

export default apiInstance;
