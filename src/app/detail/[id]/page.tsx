"use client";

import React, { useState } from "react";
import Button from "@/components/button/Button";
import EventDetailModal from "@/components/portalModal/eventDetailModal/EventDetailModal";
import Header from "@/components/header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getEventIdApi } from "@/api/events";

const Index = () => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeople(Number(e.target.value));
  };

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["event-id", params.id],
    queryFn: () => getEventIdApi(params.id),
  });

  console.log("data", data?.data);

  const {
    castings,
    category,
    discountNormalPrice,
    discountPremiumPrice,
    endEvent,
    hosts,
    imageUrls,
    isAdult,
    isSpecialSeatA,
    isSpecialSeatB,
    isSpecialSeatC,
    name,
    normalPrice,
    place,
    premiumPrice,
    startEvent,
    thumbNailUrl,
  } = data?.data || {};

  return (
    <div>
      {modal && (
        <EventDetailModal
          place={place}
          name={name}
          normalPrice={normalPrice}
          className="w-1/2"
          dimClick={false}
          numberOfPeople={numberOfPeople}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          setOnModal={() => setModal(false)}
        />
      )}
      <Header />
      <div className="flex lg:flex-row flex-col justify-center">
        <div className="flex lg:flex-row flex-col lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 py-8 md:py-10 border-t bg-white lg:h-screen h-auto">
          <div className="w-2/4">
            <picture>
              <img
                src={imageUrls}
                alt=""
                className="w-full object-center object-cover"
              />
            </picture>
          </div>
          <div className="w-2/4">
            <ul className="p-12 grid grid-cols-2 gap-12">
              <li className="font-bold">이벤트명</li>
              <li>{name}</li>
              <li className="font-bold">장소</li>
              <li>{place}</li>
              <li className="font-bold">배우명</li>
              <li>{castings}</li>
              <li className="font-bold">관람연령</li>
              <li>{isAdult ? <p>성인관람</p> : <p>전체관람</p>}</li>
              <li className="font-bold">가격</li>
              <li className="font-bold">{normalPrice}</li>
              <li></li>
              <li className="font-bold">{premiumPrice}</li>
            </ul>
          </div>
        </div>
        <div className="lg:w-1/4 md:w-8/12 w-full shadow h-full flex flex-col lg:h-screen lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 gap-20">
          <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800">
            {name}
          </p>
          <div className="mx-auto">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="yyyy년 MM월 dd일"
              inline
            />
          </div>
          <div>
            <input
              type="number"
              value={numberOfPeople}
              onChange={handlePeopleChange}
              min="1"
              max="10"
            />
            <p className="text-2xl leading-normal text-gray-800">총액</p>
            <p className="text-2xl font-bold leading-normal text-right text-gray-800">
              {normalPrice}원
            </p>
          </div>
          <Button className="w-full" onClick={() => setModal(true)}>
            예약하기
          </Button>
        </div>
      </div>
    </div>
  );
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
