'use client';

import dayjs from 'dayjs';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Slide from '../slide/Slide';

type listType = {
  data: any;
  datatype?: 'open' | 'ranking' | 'sale' | 'all'
  headerTitle?: string;
}

// 샘플 데이터
const items = [
  {
    id: 0,
    item: '`http://placehold.it/1200x400`',
    name: '이미지01'
  },
  {
    id: 1,
    item: 'http://placehold.it/1200x400/ff0000',
    name: '이미지02'
  },
  {
    id: 2,
    item: 'http://placehold.it/1200x400/00ffff',
    name: '이미지03'
  },
  {
    id: 3,
    item: '`http://placehold.it/1200x400`',
    name: '이미지01'
  },
  {
    id: 4,
    item: 'http://placehold.it/1200x400/ff0000',
    name: '이미지02'
  },
  {
    id: 5,
    item: 'http://placehold.it/1200x400/00ffff',
    name: '이미지03'
  },
]

const List = ({ data, datatype = 'all', headerTitle }: listType) => {
  const [filterdata, setFilterdata] = useState([]);
  // const filteredData =

  useEffect(() => {
    switch (datatype) {
      case 'open':
        const today = dayjs();
        const filteredData = data.filter((item: any) => {
          const itemDate = dayjs(item.startTime); // 각 항목의 날짜
          return itemDate.isAfter(today); // 날짜가 오늘보다 이전이면 true
        });
        setFilterdata(filteredData);
        break;
      default:
        setFilterdata(data);
        break;
    }
  }, [])

  return (
    <div>
      {headerTitle && <h4 className='text-center'>{headerTitle}</h4>}
      <div>
        <Slide data={items}/>
      </div>
      {/* <div className='flex'>
        {filterdata.map((item: any) => (
          <div key={item.id}>
            <Link href={`/reserve/${item.id}`}>
              {item.place}
            </Link>
          </div>
        ))}
      </div> */}

    </div>
  )
}

export default List