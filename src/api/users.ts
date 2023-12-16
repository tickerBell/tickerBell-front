import { userSelector } from "@/recoil/user";
import apiInstance from "@/util/useInterceptor";
import { useRecoilValue } from "recoil";

// 토큰 재갱신
export async function refreshTokenApi(token: string) {
  const res = await apiInstance.post("/reissue", {
    refreshToken: token,
  });
  return res.data;
}

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
export async function userInfoApi(atk: string | undefined) {
  if (atk !== undefined) {
    const res = await apiInstance.get(`/api/member`, {
      headers: {
        Authorization: `Bearer ${atk}`,
      },
    });
    return res;
  }
}

// 회원 비밀번호 확인
export async function userGetPassWordApi(password: string) {
  const res = await apiInstance.post(`/api/member/password`, {
    password: password,
  });
  return res;
}

// 회원 비밀번호 변경
export async function userChangePassWordApi(password: string) {
  const res = await apiInstance.put(`/api/member/password`, {
    password: password,
  });
  return res;
}
