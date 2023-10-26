'use client';

import Link from 'next/link'
import React from 'react'
import { isDev } from '@/util/util';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userSelector, userState } from '@/recoil/user';
import { getCookie } from '@/util/authCookie';

const Menu = () => {

  const getAtk = useRecoilValue(userSelector('atk'));
  const getRole = useRecoilValue(userSelector('role'));

  console.log('isDev', isDev);

  // console.log('권한: ', getRole && getRole, 'rtk : ', getCookie('rtk'), 'atk: ', getAtk)

  return (
    <div className='flex gap-6 text-[14px]'>
      {isDev &&
        <Link href="/modal">모달 임시</Link>
      }
      {
        getRole === 'ROLE_REGISTRANT' &&
        <Link href="/event">이벤트 등록</Link>
      }
      {
        !getAtk &&
        <Link href="/login">로그인</Link>
      }
      <Link href="/regist">회원가입</Link>
      <Link href="/mypage">마이페이지</Link>
      <Link href="/reserve">예약확인/취소</Link>
    </div>
  )
}

export default Menu