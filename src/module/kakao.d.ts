declare global {
  interface Window {
    Kakao?: KakaoSDK; // Kakao가 전역에 있을 때의 타입을 여기에 지정
  }
  interface KakaoSDK {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Auth: {
      authorize: (options: { redirectUri: string; scope: string; serviceTerms: string }) => void;
    };
  }
}

