'use client';

import dayjs from 'dayjs';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type listType = {
  data: any;
  datatype?: 'open' | 'ranking' | 'sale' | 'all'
  headerTitle?: string;
}

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
      <div className='flex'>
        {filterdata.map((item: any) => (
          <div key={item.id}>
            <Link href={`/reserve/${item.id}`}>
              {item.place}
            </Link>
          </div>
        ))}
      </div>

    </div>
  )
}

export default List