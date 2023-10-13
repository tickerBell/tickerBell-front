import Link from 'next/link'
import React from 'react'
import { isDev } from '@/util/util';

const Menu = () => {
  return (
    <div className='flex gap-6 text-[14px]'>
      {/* {isDev && */}
      {/* 테스트 */}
      <Link href="/modal">모달 임시</Link>
      {/* } */}
      ㅁㄴㅇㄹㄴㅇㅁㄹ
      ㅁㄴㅇㄹ
      ㅁㄴㅇㄹ
      <Link href="/login">로그인</Link>
      <Link href="/regist">회원가입</Link>
      <Link href="/mypage">마이페이지</Link>
      <Link href="/reserve">예약확인/취소</Link>
    </div>
  )
}

export default Menu