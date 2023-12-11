// TODO: 임시 client 페이지
'use client';

import Button from "@/components/button/Button";
import { ArrayGenerator } from "@/hooks/ArrayGenerator";
import { onClickPayment } from "@/hooks/Payment";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import ModalFrame from "../ModalFrame";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "@/util/authCookie";
import { reserveEventSeatReturnApi } from "@/api/ticketing";
import dayjs from "dayjs";
import { day, postEventDateType } from "@/util/day";
import { userSelector } from "@/recoil/user";

type BasicModalType = {
  // selectedSeats: string[];
  // setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;
  price?: number[] | undefined;
  selectDate: any;
  eventId: string | string[];
};

const EventDetailModal = ({
  setOnModal,
  dimClick,
  isDim = true,
  className,
  // selectedSeats,
  // setSelectedSeats,
  price,
  selectDate,
  eventId
}: BasicModalType & modalType) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const getName = useRecoilValue(userSelector("name"));

  console.log('selectDate', selectDate);

  const selectSeat = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < 2) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  useEffect(() => {
    console.log('선택한 자리', selectedSeats);
    let a = 0;
    if (selectedSeats.includes("A")) {
      console.log('a 선택');
    }
    if (selectedSeats.includes("A")) {
    }
    if (selectedSeats.includes("A")) {
    }
  }, [selectedSeats])

  const itemsA = ArrayGenerator(1, 20, "A-");
  const itemsB = ArrayGenerator(1, 20, "B-");
  const itemsC = ArrayGenerator(1, 20, "C-");

  console.log('받은 배열', price);

  const { data } = useQuery({
    queryKey: ['event-seat', eventId],
    queryFn: () => reserveEventSeatReturnApi(Number(eventId), `${postEventDateType(selectDate)}T00:00:00Z`)
  })
  const filteredSeats: string[] = data?.data.map((item: any) => item.selectedSeat)

  // useEffect(() => {
  //   const res = reserveEventSeatReturnApi(Number(eventId), `${postEventDateType(selectDate)}T00:00:00Z`)
  // }, []);

  console.log('선택된 자리', filteredSeats);
  // 쿠키가 string 이면 디코딩, 없다면 객체선택. 

  const handlePayment = () => {
    // onClickPayment(totalCost, getName);
  };

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={isDim}
      onClose
      dimClick={dimClick}
      className={className}
    >
      <Modal.Title>좌석 선택</Modal.Title>
      <Modal.Content>
        <div className="flex items-end">
          {/* a */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] max-w-100 gap-4">
            {itemsA.map((item, index: any) => (
              <div
                key={index}
                onClick={() => {
                  if (filteredSeats?.includes(item)) {
                    alert('매진된 좌석입니다.');
                  } else {
                    selectSeat(item)
                  }
                }}
                className={classNames(
                  "cursor-pointer border hover:border-primary p-2 text-center",
                  {
                    "border-red border-1": selectedSeats.includes(item),
                    "bg-gray-500 border-1 border-gray-500": filteredSeats?.includes(item),
                  }
                )}
              >
                {item}
              </div>
            ))}
          </div>
          {/* b */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] max-w-470 gap-4 mx-10">
            {itemsB.map((item, index: any) => (
              <div
                key={index}
                onClick={() => selectSeat(item)}
                className={classNames(
                  "cursor-pointer border hover:border-primary p-2 text-center",
                  {
                    "border-red border-1": selectedSeats.includes(item),
                    "bg-gray-500 border-1": filteredSeats?.includes(item),
                  }
                )}
              >
                {item}
              </div>
            ))}
          </div>
          {/* c */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] max-w-100 gap-4">
            {itemsC.map((item, index: any) => (
              <div
                key={index}
                onClick={() => selectSeat(item)}
                className={classNames(
                  "cursor-pointer border hover:border-primary p-2 text-center",
                  {
                    "border-red border-1": selectedSeats.includes(item),
                    "bg-gray-500 border-1": filteredSeats?.includes(item),
                  }
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Modal.Content>
      {/* TODO: 리팩토링 필요함 */}
      <Modal.Buttons>
        <div className="flex gap-12">
          <ul>
            <li>선택한 좌석: {selectedSeats.join(", ")}</li>
            <li>총 가격: 0원</li>
          </ul>
        </div>
        <Button className="ml-auto w-100" size="medium" onClick={handlePayment}>
          결제하기
        </Button>
      </Modal.Buttons>
    </ModalFrame>
  );
};

export default EventDetailModal;
