"use client";

import React, { useEffect, useState } from "react";
import Slide from "../slide/Slide";
import { eventSlideApi } from "@/api/events";
import { useQuery } from "@tanstack/react-query";
import cls from 'classnames';

const SlideList = () => {
  const [tab, setTab] = useState('rankingMusicalEventList');

  const { data, isSuccess, isError, error, isFetched, status, errorUpdatedAt } = useQuery({
    queryKey: ["main-slide"],
    queryFn: () => eventSlideApi(),
  });

  // console.log(`${errorUpdatedAt}, ${status}, ${isFetched}, isError: ${isError}  error : ${error} data: ${data}`);
  // console.log('slide: ', data);

  return (
    <>
      {!isError && isSuccess &&
        <div className="mt-60">
          <div className="flex justify-center gap-8">
            {
              data?.data['rankingMusicalEventList'] !== null &&
              <div onClick={() => setTab('rankingMusicalEventList')} className={cls("inline-flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm", {
                "bg-primary text-white": tab === 'rankingMusicalEventList'
              })}>뮤지컬</div>
            }
            {
              data?.data['rankingConcertEventList'] !== null &&
              <div onClick={() => setTab('rankingConcertEventList')} className={cls("inline-flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm", {
                "bg-primary text-white": tab === 'rankingConcertEventList'
              })}>콘서트</div>
            }
            {
              data?.data['rankingPlayEventList'] !== null &&
              <div onClick={() => setTab('rankingPlayEventList')} className={cls("inline-flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm", {
                "bg-primary text-white": tab === 'rankingPlayEventList'
              })}>여가</div>
            }
            {
              data?.data['rankingClassicEventList'] !== null &&
              <div onClick={() => setTab('rankingClassicEventList')} className={cls("inline-flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm", {
                "bg-primary text-white": tab === 'rankingClassicEventList'
              })}>클래식</div>
            }
            {
              data?.data['rankingSportsEventList'] !== null &&
              <div onClick={() => setTab('rankingSportsEventList')} className={cls("inline-flex px-12 py-4 border-1 rounded-full cursor-pointer text-sm", {
                "bg-primary text-white": tab === 'rankingSportsEventList'
              })}>스포츠</div>
            }
          </div>
          <Slide data={data?.data[tab]} title="랭킹" viewCount={5} arrow={false}/>
          <Slide data={data?.data['saleEventList']} title="할인" autoplay />
          <Slide data={data?.data['deadLineEventList']} title="마감임박" />
          <Slide data={data?.data['recommendEventList']} title="추천!" />
        </div>
      }
    </>
  );
};

export default SlideList;
