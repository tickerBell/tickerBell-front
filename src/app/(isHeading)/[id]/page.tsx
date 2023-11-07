'use client';

import Card from '@/components/item/Card';
import { useParams } from 'next/navigation'
import React from 'react'

const Index = () => {
  const params = useParams();
  // console.log('dd', params);

  return (
    <div>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  )
}

export default Index