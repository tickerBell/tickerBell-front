// 예매자
export const UserColumns: IEventHistoryTableType[] = [
  {
    eventName: "이벤트명",
    casting: "캐스팅",
    startEvent: "일시",
    place: "장소",
  },
];

// 등록자
export const EventColumns: IEventHistoryTableReserverType[] = [
  {
    eventName: "이벤트명",
    casting: "캐스팅",
    startEvent: "일시",
    place: "장소",
    ticketHolderCounts: "예매자수",
    isCancelled: "상태",
  },
];
