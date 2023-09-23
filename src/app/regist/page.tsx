'use client';

import Button from '@/components/button/Button';
import { Radio, Text } from '@/components/input/Input';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const Index = () => {
  const [tab, setTab] = useState(-1);

  type formType = {
    username?: string;
    password?: number;
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  return (
    <div className='flex h-screen max-w-400 m-auto flex-col justify-center items-center'>
      <div className='h-160 flex items-center flex-col'>
        <nav className='flex gap-8'>
          <Radio name="userType" id="구매자" label='구매자' />
          <Radio name="userType" id="등록자" label='등록자' />
        </nav>
        <nav className='flex gap-10'>
          <Button onClick={() => setTab(0)} className={classNames('bg-[#fae100] text-white', {})}>카카오 회원가입</Button>
          <Button theme='border' onClick={() => setTab(1)} className={classNames('', {
            'bg-primary text-white': tab === 1
          })}>일반 회원가입</Button>
          <Button theme='border' onClick={() => setTab(2)} className={classNames('', {
            'bg-primary text-white': tab === 2
          })}>비회원</Button>
        </nav>
        {(tab === 1 || tab === 2) &&
          <div className='mt-40'>
            <div>
              <div>
                <label>이름</label>
                <input type="text"
                  id="username"
                  placeholder='이름을 입력해주세요'
                  maxLength={5}
                  {...register('username', {
                    required: "이름은 필수 입력입니다.",
                    minLength: {
                      value: 2,
                      message: "2자리 이상 입력해주세요.",
                    },
                  })}
                />
              </div>
              {errors.username && <small role="alert">{errors.username.message}</small>}
            </div>
            <div>
              <div>
                <label>비밀번호</label>
                <input type="password"
                  id="password"
                  placeholder='비밀번호를 입력해주세요'
                  minLength={6}
                  {...register('password', {
                    required: "비밀번호는 필수 입력입니다.",
                    minLength: {
                      value: 6,
                      message: "6자리 이상 입력해주세요.",
                    },
                    pattern: {
                      value: /^[A-Za-z0-9]*$/,
                      message: "영어 또는 숫자만 입력해주세요",
                    },
                  })}
                />
              </div>
              {errors.password && <small role="alert">{errors.password.message}</small>}
            </div>
          </div>}
      </div>
    </div>
  )
}

export default Index;