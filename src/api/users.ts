import apiInstance from "@/util/useInterceptor";

// 회원가입시 문자 인증
export async function vertifySMSApi(number: number) {
  const res = await apiInstance.post("/api/join/sms-validation", {
    phone: number,
  });
  return res;
}

type userRegistType = {
  username: string;
  password: string;
  phone: string;
  isRegistration: boolean;
  isKakaoJoin: boolean
};
// 회원가입
export async function userRegistApi({ username, password, phone, isRegistration, isKakaoJoin }: userRegistType) {
  const res = await apiInstance.post("/api/members", {
    username: username,
    password: password,
    phone: phone,
    isRegistration: isRegistration,
    isKakaoJoin: isKakaoJoin
  });
  return res;
}
