"use client";

import { getEventIdApi } from "@/api/events";
import Button from "@/components/button/Button";
import Header from "@/components/header/Header";
import EventDetailModal from "@/components/portalModal/eventDetailModal/EventDetailModal";
import { seatPrice } from "@/hooks/useSeatPrice";
import { day } from "@/util/day";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// NOTE: ssg 테스트 코드
export async function generateStaticParams({ params }: any) {
  const events = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/${params.id}`).then((res) => res.json())

  return events.map((event: any) => ({
    slug: event.slug,
  }))
}

const Index = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [modal, setModal] = useState(false);
  // const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);


  const { data: eventIdData, isSuccess, isError, error } = useQuery({
    queryKey: ["event-id", params.id],
    queryFn: () => getEventIdApi(params.id),
  });
  const data = eventIdData?.data;
  const defaultDate = eventIdData ? new Date(data.startEvent) : new Date();

  if (error) {
    return <div>에러 발생: {error.message}</div>
  }

  if (isSuccess) {
    const price = seatPrice(data.discountNormalPrice, data.discountPremiumPrice, data.isSpecialSeatA, data.isSpecialSeatB, data.isSpecialSeatC)
    return (
      <div>
        {modal && (
          <EventDetailModal
            className="w-1/2"
            setOnModal={() => setModal(false)}
            price={price}
            selectDate={startDate ? startDate : defaultDate}
            eventId={params.id}
            eventName={data.name}
          />
        )}
        <div className="flex flex-col justify-center mt-40 lg:flex-row">
          <div className="flex flex-col w-full h-auto gap-40 lg:flex-row md:w-8/12">
            <div className="relative min-w-300 h-400">
              <Image
                src={data.thumbNailUrl}
                alt={data.name}
                fill
                objectFit='contain'
              />
            </div>
            <ul className="flex flex-col gap-10">
              <li className="">
                <span className="inline-flex mr-8 font-bold min-w-55">이벤트명</span>
                {data.name}
              </li>
              <li className="">
                <span className="inline-flex mr-8 font-bold min-w-55">장소</span>
                {data.place}
              </li>
              <li className="">
                <span className="inline-flex mr-8 font-bold min-w-55">배우명</span>
                {data.castings}
              </li>
              <li className="">
                <span className="inline-flex mr-8 font-bold min-w-55">관람연령</span>
                {data.isAdult ? '성인관람' : '전체관람'}
              </li>
              <li className="">
                <span className="inline-flex mr-8 font-bold min-w-55">가격</span>
                <ul>
                  <li><span>일반</span> {data.discountNormalPrice}</li>
                  <li><span>프리미엄</span> {data.discountPremiumPrice}</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex flex-col w-full h-full gap-20 lg:w-1/4 md:w-8/12 lg:h-screen">
            <p className="text-3xl leading-9 text-gray-800 lg:text-4xl">
              {data.name}
            </p>
            <div className="mx-auto">
              <DatePicker
                // selected={startDate}
                selected={startDate ? startDate : defaultDate}
                // selected={new Date(data.startEvent)}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="yyyy년 MM월 dd일"
                minDate={new Date(data.startEvent)}
                maxDate={new Date(data.endEvent)}
                inline
              />
            </div>
            <div>상영일자 및 시간
              {/* <div>{`${day(data.startEvent)}`}</div> */}
              <div>{startDate ? `${day(startDate)}` : `${day(defaultDate)}`}</div>
              <div>{`${data.dailyStartEvent}`}</div>
            </div>
            <Button className="w-full" onClick={() => setModal(true)}>
              예약하기
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
export default Index;

// NOTE 추후에 api가 나온다면 params로 받기

// export async function getStaticPaths() {
// const { data: posts } = await axios.get(`${ROOT_API}/todos`);

// const paths = posts.map((post: any) => ({
//   params: { id: post.id.toString() },
// }));

// return {
//   paths,
//   fallback: true,
// };
// }

// export async function getStaticProps({ params }: any) {
// const { data: todoItem } = await axios.get(`${ROOT_API}/todos/${params.id}`);

// return {
//   props: {
//     todoItem
//   },
//   revalidate: 60,
// };
// }
