export const kakaoInit = () => {
  const kakao = (window as any).Kakao;
  if (!kakao.isInitialized()) {
    kakao.init("a2b1480a8a6d2dc1acfcca2770e9675d");
  }

  return kakao;
};
