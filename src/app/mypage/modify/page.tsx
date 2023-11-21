'use client';

import { userGetPassWordApi } from '@/api/users';
import Button from '@/components/button/Button';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'

const Page = () => {
  const [value, setValue] = useState('');
  const [step, setStep] = useState(0);

  const onChnage = (e: any) => {
    // setValue(v)
    setValue(e.target.value);
  }

  const click = (e:any) => {
    e.preventDefault();
    console.log('클릭', value);
    userGetPassWordApi(value).then((res) => console.log('클릭1', res))
  }

  return (
    <div>
      비밀번호 변경

      <form onSubmit={click}>
        {step === 0 ?
          '비밀번호 확인' : '변경'
        }
        <input type="password" name="" id="" value={value} onChange={onChnage} />
        <Button onClick={click}>{step === 0 ? '확인' : '변경'}</Button>
      </form>
    </div>
  )
}

export default Page