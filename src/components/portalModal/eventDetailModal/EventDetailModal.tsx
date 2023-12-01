import Button from "@/components/button/Button";
import { ArrayGenerator } from "@/hooks/ArrayGenerator";
import { onClickPayment } from "@/hooks/Payment";
import classNames from "classnames";
import React, { useState } from "react";
import { Modal } from "../Modal";
import ModalFrame from "../ModalFrame";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "@/util/authCookie";

type BasicModalType = {
  selectedSeats: string[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;
  price?: number[];
};

const EventDetailModal = ({
  setOnModal,
  dimClick,
  isDim = true,
  className,
  selectedSeats,
  setSelectedSeats,
  price
}: BasicModalType & modalType) => {

  const selectSeat = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < 2) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const itemsA = ArrayGenerator(1, 20, "a-");
  const itemsB = ArrayGenerator(1, 20, "b-");
  const itemsC = ArrayGenerator(1, 20, "c-");

  console.log('받은 배열', price);

  // 쿠키가 string 이면 디코딩, 없다면 객체선택. 

  const handlePayment = () => {
    // onClickPayment(totalCost, name, place);
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
                onClick={() => selectSeat(item)}
                className={classNames(
                  "cursor-pointer border hover:border-primary p-2 text-center",
                  {
                    "border-red border-1": selectedSeats.includes(item),
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
