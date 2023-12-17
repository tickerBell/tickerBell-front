
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

export const HistoryTableBody = ({
  row
}: HistoryTableBodyProps) => {
  // const { eventHistoryResponse, isPast, isTicketingCancelled, payment, paymentId, selectedDate, selectedSeatReponseList, ticketingId, } = row;

  const queryClient = useQueryClient();
  const getRole = useRecoilValue(userSelector("role"));
  const getPaging = useRecoilValue(paginateSelector);
  const [onModal, setOnModal] = useState(false);
  const date = new Date;
  // console.log('row getPaging', getPaging, row);
  console.log('row getPaging', getPaging);

  // 회원 - 예약자 취소
  const deleteReserverMutation = useMutation({
    mutationFn: (id: number) => userDeleteReserverIdApi(id),
    onSuccess: () => {
      console.log('예약자 취소');
      queryClient.invalidateQueries({ queryKey: ['event-reservelist-member', getPaging] })
    }
  })

  // 회원 - 등록자 취소
  const deleteResisterMutation = useMutation({
    mutationFn: (id: number) => userDeleteResigsterIdApi(id),
    onSuccess: () => {
      console.log('등록자 취소');
      queryClient.invalidateQueries({ queryKey: ['event-reservelist-member', getPaging] })
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
      {/* 회원 - 예매자 일때 */}
      {
        getRole === 'ROLE_USER' &&
        <tr
          className="text-sm text-center text-gray-900 border-b"
          onClick={(e) => {
            e.stopPropagation();
            setOnModal(true)
          }}
        >
          <td className="px-6 py-4 truncate max-w-200 min-w-200">
            {row.eventHistoryResponse.eventName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">{row.eventHistoryResponse.castingList.map((item: string) => item)}</td>
          <td className="px-6 py-4 whitespace-nowrap">{day(row.selectedDate)}</td>
          <td className="px-6 py-4 truncate whitespace-nowrap max-w-400 min-w-400">{row.eventHistoryResponse.place}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            {row.payment}원
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {row.selectedSeatResponseList?.map((item: any) => item?.seatInfo)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {row.paymentId}
          </td>
          <td className="px-6 py-4 whitespace-nowrap w-60">
            {row.isTicketingCancelled ? '취소됨' : row.isPast ? '진행됨' : '진행예정'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Button className="border" onClick={(e: any) => {
              e.stopPropagation();
              cancleEvent(row.eventHistoryResponse.eventId, row.ticketingId)
            }} >{getRole === "ROLE_REGISTRANT" ? '등록' : '예매'} 취소</Button>
          </td>
        </tr>
      }
      {/* 회원 - 등록자 일때 */}
      {
        getRole === 'ROLE_REGISTRANT' &&
        <tr
          className="text-sm text-center text-gray-900 border-b"
          onClick={(e) => {
            e.stopPropagation();
            setOnModal(true)
          }}
        >
          <td className="px-6 py-4 truncate max-w-200 min-w-200">
            {row.eventName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">{row.castingList.map((item: string) => item)}</td>
          <td className="px-6 py-4">{`${day(row.startEvent)} ~ ${day(row.endEvent)}`}</td>
          <td className="px-6 py-4 truncate whitespace-nowrap max-w-400 min-w-400">{row.place}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            {row.selectedSeatCount}
          </td>
          <td className="px-6 py-4 whitespace-nowrap w-60">
            {/* TODO: 날짜비교후 진행됨, 진행예정 표시하기 */}
            {row.isEventCancelled ? '취소됨' : '진행예정'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Button className="border" onClick={(e: any) => {
              e.stopPropagation();
              cancleEvent(row.eventId, 0)
            }} >{getRole === "ROLE_REGISTRANT" ? '등록' : '예매'} 취소</Button>
          </td>
        </tr>
      }
    </>
  );
};
