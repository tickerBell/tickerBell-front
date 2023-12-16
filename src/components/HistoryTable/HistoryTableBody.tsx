
"use client";

import { userSelector } from "@/recoil/user";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Button from "../button/Button";
import ReserveModal from "../portalModal/reserveModal/ReserveModal";
import { day, dayCompare, today } from "@/util/day";
import { epochConvertReverse } from "@/util/epochConverter";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userDeleteReserverIdApi, userDeleteResigsterIdApi } from "@/api/ticketing";
import './historytable.scss';
import { paginateSelector } from "@/recoil/paginate";

type HistoryTableBodyProps = {
  // row: IEventHistoryTableReserverType;
  row: any;
}

export const HistoryTableBody: React.FC<HistoryTableBodyProps> = ({
  row,
}) => {
  const { eventHistoryResponse, isPast, isTicketingCancelled, payment, paymentId, selectedDate, selectedSeatReponseList, ticketingId } = row;

  const queryClient = useQueryClient();
  const getRole = useRecoilValue(userSelector("role"));
  const getPaging = useRecoilValue(paginateSelector);
  const [onModal, setOnModal] = useState(false);
  const date = new Date;
  // console.log('r : ', row);

  const deleteReserverMutation = useMutation({
    mutationFn: (id: number) => userDeleteReserverIdApi(id),
    onSuccess: () => {
      console.log('여기');
      queryClient.invalidateQueries({ queryKey: ['event-reservelist-member', getPaging] })
    }
  })

  const deleteResisterMutation = useMutation({
    mutationFn: (id: number) => userDeleteResigsterIdApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-reservelist', getPaging] })
    }
  })

  const cancleEvent = (id: any, ticketingId: any) => {
    if (!confirm(`이벤트 ${getRole === "ROLE_REGISTRANT" ? '등록을' : '예매를'} 취소할까요?`)) {
      // 아니오
    } else {
      // 예
      if (getRole === "ROLE_REGISTRANT") {
        console.log('예약자 일때')
        deleteResisterMutation.mutate(id);
      }
      else if (getRole === 'ROLE_USER') {
        console.log('회원', ticketingId);
        deleteReserverMutation.mutate(ticketingId);
      }
      else {
        // 비회원 예매 취소
      }
    }
  }

  return (
    <>
      {onModal && (
        <ReserveModal
          className="w-800 m-h-600"
          dimClick={true}
          setOnModal={() => setOnModal(false)}
          eventId={row.eventId}
        />
      )}
      <tr
        className="text-sm text-center text-gray-900 border-b"
        onClick={(e) => {
          e.stopPropagation();
          setOnModal(true)
        }}
      >
        <td className="px-6 py-4 truncate max-w-200 min-w-200">
          {eventHistoryResponse.eventName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{eventHistoryResponse.castingList.map((item: string) => item)}</td>
        <td className="px-6 py-4 whitespace-nowrap">{day(selectedDate)}</td>
        <td className="px-6 py-4 truncate whitespace-nowrap max-w-400 min-w-400">{eventHistoryResponse.place}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {payment}원
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          좌석번호
          {/* {selectedSeatReponseList.map((item:string) => item.seatInfo)} */}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {paymentId}
        </td>
        <td className="px-6 py-4 whitespace-nowrap w-60">
          {isTicketingCancelled ? '취소됨' ? isPast : '진행됨' : '진행예정'}
        </td>
        {/* {
          ticketHolderCounts !== null && <td className="px-6 py-4 min-w-100">{ticketHolderCounts}명</td>
        } */}
        <td className="px-6 py-4 whitespace-nowrap">
          <Button className="border" onClick={(e: any) => {
            e.stopPropagation();
            cancleEvent(eventHistoryResponse.eventId, ticketingId)
          }} >{getRole === "ROLE_REGISTRANT" ? '등록' : '예매'} 취소</Button>
        </td>
      </tr>
    </>
  );
};
