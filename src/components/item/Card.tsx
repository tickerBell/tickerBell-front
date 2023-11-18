import { day } from '@/util/day';
import { price } from '@/util/price';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

type cardType = {
  data: any;
}

const Card = ({ data }: cardType) => {
  // console.log('data', data);
  return (
    <div className='w-full'>
      <Link href={`/detail/${data.eventId}`}>
        <Image src="https://i.postimg.cc/pTm02zHV/00.png" alt="" width={200} height={300} />
        <div>{data.eventName}</div>
        <div>스피커</div>
        <div>장소</div>
        <div>{day(data.startEvent)}</div>
        <div>{price(data.normalPrice)}원</div>
        {
          data.afterSalePrice && 
          <div>{price(data.afterSalePrice)}원</div>
        }
      </Link>
    </div>
  )
}

export default Card