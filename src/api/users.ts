import apiInstance from "@/util/useInterceptor";

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
export async function userLoginApi(
  username: string,
  password: string,
) {
  const res = await apiInstance.post("/api/login", {
    username: username,
    password: password,
  });
  return res;
}

// 회원 정보 조회
export async function userInfoApi() {
  const res = await apiInstance.post("/api/member", { });
  return res;
}