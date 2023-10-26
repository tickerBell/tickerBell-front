'use client';

import Button from '@/components/button/Button';
import axios from 'axios';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
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
    if (e.target.value === 'isRegistrationTrue') {
      setRadio('true');
    } else {
      setRadio('false');
    }
  }

  return (
    <div className='flex h-screen max-w-400 m-auto flex-col justify-center items-center'>
      <div className='h-320 flex items-center flex-col relative'>
        {radio == '' &&
          <nav className="flex h-100">
            <div className='h-full flex flex-col items-center justify-center w-200 border border-1 border-primary cursor-pointer rounded-6 button-hover' onClick={() => setRadio('isRegistrationTrue')}>
              <span>예매자</span>
              로 가입하기
            </div>
            <div className='h-full flex flex-col items-center justify-center w-200 border border-1 border-primary ml-[4px] cursor-pointer rounded-6 button-hover'  onClick={() => setRadio('isRegistrationFalse')}>
              <span>등록자</span>
              로 가입하기
            </div>
          </nav>
        }
        {
          radio != '' &&
          <button onClick={() => setRadio('')}>가입유형 다시 선택하기</button>
        }
        {radio != '' && <nav className='flex gap-10 mt-10'>
          <Button onClick={click} className={classNames('bg-[#fae100] text-white', {})}>카카오 회원가입</Button>
          <Button theme='border' onClick={() => setTab(1)} className={classNames('border-primary hover:bg-primary hover:saturate-100 hover:text-white', {
            'bg-primary text-white': tab === 1
          })}>일반 회원가입</Button>
        </nav>}
        <RegistForm tab={tab} isRegistration={radio} setTab={setTab}/>
      </div>
    </div>
  )
}

export default Index;


