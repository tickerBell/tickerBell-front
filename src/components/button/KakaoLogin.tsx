import React from 'react'



const KakaoLogin = () => {
  const open = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    window.open("https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=8fd7a1f394d9bbd09fdfdd3827146d73&redirect_uri=http://3.37.206.141:8080/login/oauth2/code/kakao", "_self");
  };

  // <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=8fd7a1f394d9bbd09fdfdd3827146d73&redirect_uri=http://3.37.206.141:8080/login/oauth2/code/kakao">Kakao 로그인</a>

  return (
    <div onClick={open}>
      카카오 로그인
    </div>
  )
}

export default KakaoLogin