'use client';

import { useParams } from 'next/navigation'
import React from 'react'

const Index = () => {
  const params = useParams();
  console.log('dd', params);
  
  return (
    <div>
      메뉴 클릭시 카드 리스트
    </div>
  )
}

export default Index