import React, { useState } from 'react'
import Button from '../button/Button';
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import { Radio } from './Input';
import axios from 'axios';
import apiInstance from '@/util/useInterceptor';
import { userRegistApi, vertifySMSApi } from '@/api/users';

type formPropsType = {
  tab: number;
  registType?: 'login' | 'regist';
  isRegistration?: boolean;
}

const RegistForm = ({ tab, registType = 'regist', isRegistration }: formPropsType) => {
  // const [sms, setSms] = useState(0);
  const [sms, setSms] = useState({
    inputnumber: 0, // 문자 입력
    sendsms: 0, // api로 받은문자 인증번호
    vertifysms: 0, // 인증번호 입력
  })

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  // 인증번호 발송
  const vertifySms = () => {
    console.log('dd', sms)
    vertifySMSApi(sms.inputnumber).then((res) => {
      console.log('res', res);
      setSms((prevState) => ({
        ...prevState,
        sendsms: res.data
      }));
    });
  }

  // 인증번호 확인
  const okSms = () => {
    if (sms.sendsms === sms.vertifysms) {

    }
  }

  const onChange = (e: any) => {
    const key = e.target.value;
    setSms((prevState) => ({
      ...prevState,
      inputnumber: key
    }));
  }

  const chkonChange = (e: any) => {
    const key = e.target.value;
    setSms((prevState) => ({
      ...prevState,
      vertifysms: key
    }));
  }

  // console.log('회원가입 폼 : ', watch(), isRegistration)
  console.log('isSubmitting', isSubmitting);

  const onSubmit = (data: any) => {
    // userRegistApi()
    console.log('form : ', data);
  }

  return (
    <div>
      <form className='mt-40 w-full' onSubmit={handleSubmit(onSubmit)}>
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
                <input type="text" name="" id="" placeholder='- 을 제외한 11자리입력' onChange={onChange} maxLength={11} />
                <Button size='small' onClick={vertifySms}>문자인증</Button>
              </div>
            </div>
            {sms.sendsms !== 0 &&
              <div className='mb-10'>
                <div className='flex items-center gap-6 whitespace-pre'>
                  인증번호
                  <input type="text" name="" id="" placeholder='문자로 수신된 인증버호 입력' onChange={onChange} maxLength={4} />
                  <Button size='small' onClick={vertifySms}>확인</Button>
                </div>
              </div>
            }
            <Button className='absolute bottom-0' full
              type="submit"
              disabled={!isSubmitting}
              // disabled={true}
            >{registType === 'login' ? '로그인' : '회원 가입'}</Button>
          </>
        }
      </form>
    </div>
  )
}

export default RegistForm