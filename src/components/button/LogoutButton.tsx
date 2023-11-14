import React from 'react'
import Button from './Button'
import { removeCookie } from '@/util/authCookie'
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { userSelector } from '@/recoil/user';

const LogoutButton = () => {
  const setIsLogin = useSetRecoilState(userSelector("isLogin"));

  const router = useRouter();
  const logout = () => {
    // atk와 rtk값 삭제하기
    removeCookie('ticket-atk');
    removeCookie('ticket-rtk');
    setIsLogin(false);
    router.push("/");
    console.log('로그아웃 클릭');
  }
  return (
    <Button onClick={logout}>
      로그아웃
    </Button>
  )
}

export default LogoutButton