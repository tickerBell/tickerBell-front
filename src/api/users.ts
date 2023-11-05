import { userSelector } from "@/recoil/user";
import apiInstance from "@/util/useInterceptor";
import { useRecoilValue } from "recoil";

// 회원가입시 문자 인증
export async function vertifySMSApi(number: string) {
  const res = await apiInstance.post("/api/join/sms-validation", {
    phone: number,
  });
  return res;
}

// 회원가입
export async function userRegistApi(
  username: string,
  password: string,
  phone: number,
  isAdult: boolean,
  isRegistration: boolean,
  isKakaoJoin: boolean
) {
  const res = await apiInstance.post("/api/members", {
    username: username,
    password: password,
    phone: phone,
    isAdult: isAdult,
    isRegistration: isRegistration,
    isKakaoJoin: isKakaoJoin,
  });
  return res;
}

// 로그인
export async function userLoginApi(username: string, password: string) {
  const res = await apiInstance.post("/api/login", {
    username: username,
    password: password,
  });
  return res;
}

// 회원 정보 조회
export async function userInfoApi(atk: string) {
  const res = await apiInstance.get("/api/member", {
    headers: {
      Authorization: `Bearer ${atk}`,
    },
  });
  return res;
}

export async function userReserveApi(
  atk: string,
  page: number,
  size: number,
  sort: string[]
) {
  const res = await apiInstance.get("/api/member/my", {
    headers: {
      Authorization: `Bearer ${atk}`,
    },
    params: { page: 0, size: 1, sort: ["string"] },
  });
  return res;
}
