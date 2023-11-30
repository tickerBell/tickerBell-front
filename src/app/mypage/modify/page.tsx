'use client';

import { userChangePassWordApi, userGetPassWordApi } from '@/api/users';
import Button from '@/components/button/Button';
import { getCookie } from '@/util/authCookie';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

// type stepType = {
//   step: 'confirm'| 'modify'
// }

const Page = () => {
  const [value, setValue] = useState('');
  const [step, setStep] = useState(0);

  const onChnage = (e: any) => {
    // setValue(v)
    setValue(e.target.value);
  }

  const click = (e: any) => {
    e.preventDefault();
    if (step === 0) {
      userGetPassWordApi(value).then((res) => res.data == null ? setStep(1) : toast(`${res.data}`))
    }
    if (step === 1) {
      userChangePassWordApi(value).then((res) => res.data == null && toast(`${res.data}`))
    }
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