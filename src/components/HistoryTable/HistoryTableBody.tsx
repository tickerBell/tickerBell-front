
"use client";

import { userSelector } from "@/recoil/user";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import Button from "../button/Button";
import ReserveModal from "../portalModal/reserveModal/ReserveModal";
import { day, dayCompare, today } from "@/util/day";
import { epochConvertReverse } from "@/util/epochConverter";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEventApi } from "@/api/events";
import { userDeleteReserveIdApi } from "@/api/users";

interface HistoryTableBodyProps {
  row: IEventHistoryTableReserverType;
}

export const HistoryTableBody: React.FC<HistoryTableBodyProps> = ({
  row
}) => {
  const { startEvent, eventName, casting, place, isCancelled, ticketHolderCounts } = row;
  const queryClient = useQueryClient();
  const getRole = useRecoilValue(userSelector("role"));
  const [onModal, setOnModal] = useState(false);
  const date = new Date;

  const mutation = useMutation({
    mutationFn: () => userDeleteReserveIdApi(1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  const cancleEvent = () => {
    if (!confirm(`이벤트 ${getRole === "ROLE_REGISTRANT" ? '등록을' : '예매를'} 취소할까요?`)) {
      // 아니오
    } else {
      // 예
    }
  }

  // console.log('row', row);

  return (
    <>
      {onModal && (
        <ReserveModal
          className="w-400"
          dimClick={true}
          setOnModal={() => setOnModal(false)}
          eventId={row}
        />
      )}
      <tr
        className="text-sm text-center text-gray-900 border-b cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOnModal(true)
        }}
      >
        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
          {eventName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{casting}</td>
        <td className="px-6 py-4 whitespace-nowrap">{day(startEvent)}</td>
        <td className="px-6 py-4 whitespace-nowrap">{place}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {isCancelled ? '취소됨' ? dayCompare(date, startEvent) : '진행됨': '진행예정'}
        </td>
        {
          ticketHolderCounts !== null && <td className="px-6 py-4 whitespace-nowrap">{ticketHolderCounts}명</td>
        }
        <td className="px-6 py-4 whitespace-nowrap">
          <Button className="border" onClick={(e: any) => {
            e.stopPropagation();
            cancleEvent()
          }} >{getRole === "ROLE_REGISTRANT" ? '등록' : '예매'} 취소</Button>
        </td>
      </tr>
    </>
  );
};
