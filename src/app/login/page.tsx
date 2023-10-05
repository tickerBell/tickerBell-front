'use client';

import Button from '@/components/button/Button';
import axios from 'axios';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Radio } from '@/components/form/Input';
import RegistForm from '@/components/form/RegistForm';

const Index = () => {
  const [tab, setTab] = useState(-1);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  // 카카오 로그인이 됬을때 0 번 보이기
  // console.log('dd', localStorage.getItem('kakaoid'))
  const click = () => {
    router.push(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=8fd7a1f394d9bbd09fdfdd3827146d73&redirect_uri=
http://localhost:3000/oauth/kakao`);
  }

  return (
    <div className='flex h-screen max-w-400 m-auto flex-col justify-center items-center'>
      <div className='h-320 flex items-center flex-col relative'>
        <nav className='flex gap-8'>
          <Radio name="userType" id="예매자" label='예매자' />
          <Radio name="userType" id="등록자" label='등록자' />
        </nav>
        <nav className='flex gap-10 mt-10'>
          <Button onClick={click} className={classNames('bg-[#fae100] text-white', {})}>카카오 로그인</Button>
          <Button theme='border' onClick={() => setTab(1)} className={classNames('border-primary', {
            'bg-primary text-white': tab === 1
          })}>일반 회원 로그인</Button>
          <Button theme='border' onClick={() => setTab(2)} className={classNames('border-primary', {
            'bg-primary text-white': tab === 2
          })}>비회원 로그인</Button>
        </nav>
        <RegistForm tab={tab} registType="login" />
      </div>
    </div>
  )
}

export default Index;


