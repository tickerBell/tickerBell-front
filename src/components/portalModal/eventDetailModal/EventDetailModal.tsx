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
import { day, merchantUidDate, postEventDateType } from "@/util/day";
import { userSelector } from "@/recoil/user";
import { userInfoApi } from "@/api/users";

type BasicModalType = {
  // selectedSeats: string[];
  // setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;
  price: number[];
  selectDate: any;
  eventId: string;
  eventName: string;
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
  eventId,
  eventName
}: BasicModalType & modalType) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const getName = useRecoilValue(userSelector("name"));
  const [merchant, setMerchant] = useState<Number>(0);

  const selectSeat = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < 2) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const itemsA = ArrayGenerator(1, 20, "A-");
  const itemsB = ArrayGenerator(1, 20, "B-");
  const itemsC = ArrayGenerator(1, 20, "C-");
  const renderSheet: any = {
    itemsA,
    itemsB,
    itemsC
  }

  // console.log('받은 배열', price);

  const { data } = useQuery({
    queryKey: ['event-seat', eventId],
    queryFn: () => reserveEventSeatReturnApi(Number(eventId), `${postEventDateType(selectDate)}T00:00:00Z`)
  })
  const filteredSeats: string[] = data?.data.map((item: any) => item.selectedSeat)

  // console.log('선택된 자리', eventId, data);
  // 쿠키가 string 이면 디코딩, 없다면 객체선택. 

  useEffect(() => {
    if (typeof getCookie('ticket-atk') === 'string' && getCookie('ticket-atk') !== undefined) {
      userInfoApi(getCookie('ticket-atk'))
        .then((res) => {
          setMerchant(
            Number(`${merchantUidDate(selectDate)}${res?.data.phone.slice(-4)}${Math.floor(1000 + Math.random() * 9000)}`))
          // console.log('여기', Number(`${merchantUidDate(selectDate)}${res?.data.phone.slice(-4)}${Math.floor(1000 + Math.random() * 9000)}`))
        })
      // merchant_uid = `${merchantUidDate(selectDate)}${res}${Math.floor(1000 + Math.random() * 9000)}`
    }
    // 비회원일때
    if (typeof getCookie('ticket-atk') === 'object' && getCookie('ticket-atk') !== undefined) {
      // merchant_uid = `${merchantUidDate(selectDate)}${getCookie('ticket-atk').phone}${Math.floor(1000 + Math.random() * 9000)}`
    }
  }, [])

  const handlePayment = () => {
    // 회원일때

    console.log('merchant_uid', selectedPrice,
      getName,
      eventName,
      selectedSeats,
      `${postEventDateType(selectDate)}T00:00:00Z`,
      String(merchant),
      Number(eventId))

    onClickPayment(
      selectedPrice,
      getName,
      eventName,
      selectedSeats,
      `${postEventDateType(selectDate)}T00:00:00Z`,
      String(merchant),
      Number(eventId)
    );
  };

  // NOTE: 이 부분 코드 개선 필요
  useEffect(() => {
    const a = selectedSeats.filter(item => item.includes('A')).length;
    const b = selectedSeats.filter(item => item.includes('B')).length;
    const c = selectedSeats.filter(item => item.includes('C')).length;
    setSelectedPrice(a * price[0] + b * price[1] + c * price[2]);
  }, [selectedSeats])

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
          {Object.keys(renderSheet).map((key: any) => (
            <div key={key} className={classNames("grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] max-w-100 gap-4", {
              "max-w-470 mx-10": key == 'itemsB'
            })}>
              {/* <h2>Items in {key}:</h2> */}
              {renderSheet[key]?.map((item: any, index: any) => (
                <div
                  key={index}
                  onClick={() => {
                    if (filteredSeats?.includes(item)) {
                      alert('매진된 좌석입니다.');
                    } else {
                      selectSeat(item);
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
          ))}
        </div>
      </Modal.Content>
      {/* TODO: 리팩토링 필요함 */}
      <Modal.Buttons>
        <div className="flex gap-12">
          <ul>
            <li>선택한 좌석: {selectedSeats.join(", ")}</li>
            <li>총 가격: {selectedPrice}원</li>
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
