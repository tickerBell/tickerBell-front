import React from 'react'
import Button from './Button'
import { removeCookie } from '@/util/authCookie'
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();
  const logout = () => {
    // atk와 rtk값 삭제하기
    removeCookie('ticket-atk');
    removeCookie('ticket-rtk');
    router.push("/");
  }
  return (
    <Button onClick={logout}>
      로그아웃
    </Button>
  )
}

export default LogoutButton