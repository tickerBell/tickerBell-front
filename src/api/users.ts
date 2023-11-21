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

type pagingType = {
  page: number;
  size?: number;
};

// 회원: 예매 내역 or 등록 내역 조회
export async function userReserveApi(atk: string, page: number) {
  const res = await apiInstance.get("/api/member/my", {
    headers: {
      Authorization: `Bearer ${atk}`,
    },
    params: { page: page, size: 10 },
  });
  return res;
}

// 비회원: 예매 내역
export async function noneUserReserveApi(name: string, phone: number) {
  const res = await apiInstance.get("/ticketing-nonMember", {
    params: { name: name, phone: phone },
  });
  return res;
}

// 예매 내역 or 등록 내역 삭제
export async function userDeleteReserveIdApi(id: number) {
  const res = await apiInstance.delete(`/ticketing/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${atk}`,
    // },
  });
  return res;
}
