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
    <div className='flex max-w-800 m-auto flex-col content-center items-center'>
      <nav>
        <Button onClick={() => setTab(0)} className={classNames('', {
          'bg-slate-300': tab === 0
        })}>카카오 회원가입</Button>
        <Button onClick={() => setTab(1)} className={classNames('', {
          'bg-slate-300': tab === 1
        })}>일반 회원가입</Button>
        <Button onClick={() => setTab(2)} className={classNames('', {
          'bg-slate-300': tab === 2
        })}>비회원</Button>
      </nav>
      <nav className='flex'>
        <Radio name="userType" id="구매자" label='구매자' />
        <Radio name="userType" id="등록자" label='등록자' />
      </nav>
      {(tab === 1 || tab === 2) && <div>
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
  )
}

export default Index