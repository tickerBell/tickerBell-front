import React, { useState } from 'react'
import Button from '../button/Button';
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import { Radio } from './Input';

type formPropsType = {
  tab: number;
  registType?: 'login' | 'regist';
}

const RegistForm = ({ tab, registType = 'regist' }: formPropsType) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const today = dayjs();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  return (
    <div>
      <div className='mt-40 w-full'>
        {tab === 1 &&
          <>
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

            <div className='flex gap-6 mb-10'>
              성인 여부
              <nav className='flex gap-8'>
              <Radio name="adultchk" id="미성년" label='미성년' />
              <Radio name="adultchk" id="성년" label='성년' />
              </nav>
            </div>
            <div className='mb-10'>
              <div className='flex items-center gap-6 whitespace-pre'>
                전화번호
                <input type="text" name="" id="" />
                <Button size='small'>문자인증</Button>
              </div>
            </div>
            <Button className='absolute bottom-0' onClick={() => {
              // 채워넣기
            }}>{registType === 'login' ? '로그인' : '회원 가입'}</Button>
          </>
        }
      </div>
    </div>
  )
}

export default RegistForm