import { kakaoInit } from "@/util/kakaoinit";

export const kakaoLogin = async () => {
    // 카카오 초기화
    const kakao = kakaoInit();

    // 카카오 로그인 구현
    kakao.Auth.login({
      success: () => {
        kakao.API.request({
          url: '/v2/user/me', // 사용자 정보 가져오기
          success: (res: any) => {
            // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push
            console.log(res);
            // Router.push('/kakao');
          },
          fail: (error: any) => {
            console.log(error);
          }
        })
      },
      fail: (error: any) => {
        console.log(error);
      }
    })
  }

export const KakaoLogout = () => {
  const kakao = kakaoInit();

  console.log(kakao.Auth.getAccessToken()); // 카카오 접근 토큰 확인 (로그인 후 해당 토큰을 이용하여 추가 기능 수행 가능)

  // 카카오 로그인 링크 해제
  kakao.API.request({
    url: "/v1/user/unlink",
    success: (res: any) => {
      // 로그인 성공할 경우 정보 확인 후 / 페이지로 push
      console.log(res);
      // Router.push('/');
    },
    fail: (error: any) => {
      console.log(error);
    },
  });
};
