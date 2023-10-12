'use client';

import Button from '@/components/button/Button';
import axios from 'axios';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Radio } from '@/components/form/Input';
import RegistForm from '@/components/form/RegistForm';

import { userState } from '@/recoil/user';
import { useRecoilState } from 'recoil';

const Index = () => {
  const [tab, setTab] = useState(-1);
  const [radio, setRadio] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  // 카카오 로그인
  const click = () => {
    router.push(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=8fd7a1f394d9bbd09fdfdd3827146d73&redirect_uri=
http://localhost:3000/oauth/kakao`);
  }

  const onChangeRadio = (e: any) => {
    setRadio(e.target.value);
  }

  return (
    <div className='flex h-screen max-w-400 m-auto flex-col justify-center items-center'>
      <div className='h-320 flex items-center flex-col relative'>
        <nav className='flex gap-8'>
          <Radio name="userType" id="예매자" label='예매자' value={'isRegistrationTrue'}
            checked={radio === 'isRegistrationTrue'}
            onChange={onChangeRadio}
          />
          <Radio name="userType" id="등록자" label='등록자' value={'isRegistrationFalse'}
            checked={radio === 'isRegistrationFalse'}
            onChange={onChangeRadio}
          />
        </nav>
        <nav className='flex gap-10 mt-10'>
          <Button onClick={click} className={classNames('bg-[#fae100] text-white', {})}>카카오 회원가입</Button>
          <Button theme='border' onClick={() => setTab(1)} className={classNames('border-primary', {
            'bg-primary text-white': tab === 1
          })}>일반 회원가입</Button>
        </nav>
        <RegistForm tab={tab} isRegistration={radio === 'isRegistrationTrue' ? true : false} />
      </div>
    </div>
  )
}

export default Index;


