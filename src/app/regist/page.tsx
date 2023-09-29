'use client';

import Button from '@/components/button/Button';
import { Radio, Text } from '@/components/input/Input';
import { kakaoLogin } from '@/hooks/Kakao';
import { kakaologinState } from '@/recoil/user';
import { kakaoInit } from '@/util/kakaoinit';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useRecoilState } from 'recoil';

const Index = () => {
  const [tab, setTab] = useState(-1);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  

  const today = dayjs();
  const startYear = today.get('year') - 70;
  const endYear = today.get('year') - 10;


  // 현재 연수의 - 60 ~ 현재 연수의 -10 까지
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => (startYear + index).toString()).map((year) => `${year}년`)

  const months = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];

  const days = [
    ...Array(31).fill(1).map((_, i) => (i + 1).toString()).map((day) => `${day}일`)
  ];

  const handleYearChange = (e: any) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e: any) => {
    setSelectedMonth(e.target.value);
  };

  const handleDayChange = (e: any) => {
    setSelectedDay(e.target.value);
  };

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

  // 카카오 로그인이 됬을때 0 번 보이기
  // console.log('dd', localStorage.getItem('kakaoid'))

  return (
    <div className='flex h-screen max-w-400 m-auto flex-col justify-center items-center'>
      <div className='h-320 flex items-center flex-col relative'>
        <nav className='flex gap-8'>
          <Radio name="userType" id="예매자" label='예매자' />
          <Radio name="userType" id="등록자" label='등록자' />
        </nav>
        <nav className='flex gap-10 mt-10'>
          <Button onClick={kakaoLogin} className={classNames('bg-[#fae100] text-white', {})}>카카오 회원가입</Button>
          <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=8fd7a1f394d9bbd09fdfdd3827146d73&redirect_uri=http://3.37.206.141:8080/login/oauth2/code/kakao">Kakao 로그인</a>
          <Button theme='border' onClick={() => setTab(1)} className={classNames('border-primary', {
            'bg-primary text-white': tab === 1
          })}>일반 회원가입</Button>
          <Button theme='border' onClick={() => setTab(2)} className={classNames('border-primary', {
            'bg-primary text-white': tab === 2
          })}>비회원</Button>
        </nav>
        <div className='mt-40 w-full'>
          <div className='mb-10'>
            <div className='flex gap-6'>
              <label>{tab === 1 ? '아이디' : '이름'}</label>
              <input type="text"
                id="username"
                placeholder={tab === 1 ? '아이디를 입력해주세요' : '이름을 입력해주세요'}
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
          {tab === 1 &&
            <div className='mb-10'>
              <div className='flex gap-6'>
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
          }
          <div className='flex gap-6 mb-10'>
            생년월일
            <div className="flex gap-4">
              <select value={selectedYear} onChange={handleYearChange}>
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select value={selectedMonth} onChange={handleMonthChange}>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select value={selectedDay} onChange={handleDayChange}>
                {days.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='mb-10'>
            <div className='flex items-center gap-6 whitespace-pre'>
              전화번호
              <input type="text" name="" id="" />
              <Button size='small'>문자인증</Button>
            </div>
          </div>

        </div>
        <Button className='absolute bottom-0' onClick={() => {
          // 채워넣기
        }}>회원 가입</Button>
      </div>
    </div>
  )
}

export default Index;