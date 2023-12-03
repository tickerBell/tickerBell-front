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

const Index = () => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const { data: eventIdData, isSuccess, isError, error } = useQuery({
    queryKey: ["event-id", params.id],
    queryFn: () => getEventIdApi(params.id),
  });
  const data = eventIdData?.data;

  console.log("data", data);

  useEffect(() => {
    console.log('selectedSeats', selectedSeats)
  }, [selectedSeats])

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
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            setOnModal={() => setModal(false)}
            price={price}
            selectData={startDate}
            eventId={params.id}
          />
        )}
        <div className="flex lg:flex-row flex-col justify-center mt-40">
          <div className="flex lg:flex-row flex-col md:w-8/12 w-full h-auto gap-40">
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
                <span className="font-bold">이벤트명</span>
                {data.name}
              </li>
              <li className="">
                <span className="font-bold">장소</span>
                {data.place}
              </li>
              <li className="">
                <span className="font-bold">배우명</span>
                {data.castings}
              </li>
              <li className="">
                <span className="font-bold">관람연령</span>
                {data.isAdult ? '성인관람' : '전체관람'}
              </li>
              <li className="">
                <span className="font-bold">가격</span>
                <ul>
                  <li><span>일반</span> {data.discountNormalPrice}</li>
                  <li><span>프리미엄</span> {data.discountPremiumPrice}</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/4 md:w-8/12 w-full h-full flex flex-col lg:h-screen gap-20">
            <p className="lg:text-4xl text-3xl leading-9 text-gray-800">
              {data.name}
            </p>
            <div className="mx-auto">
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="yyyy년 MM월 dd일"
                minDate={new Date(data.availablePurchaseTime)}
                maxDate={new Date(data.endEvent)}
                inline
              />
            </div>
            <div>상영일자 및 시간
              <div>{`${day(startDate)}`}</div>
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
