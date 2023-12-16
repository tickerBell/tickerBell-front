interface IEventHistoryTableType {
  eventId?: number;
  eventName: string;
  casting: string;
  startEvent: string;
  place: string;
}

interface IEventHistoryTableReserverType extends IEventHistoryTableType {
  ticketHolderCounts?: number | string; // 등록자 - 예매수
  isCancelled?: boolean | string; // 예매자 - 취소상태
  ticketingId?: number; // 예매자 - 
  payment?: string;
  seatInfo?: string;
  paymentId?: string; // 예매번호
}

interface IUserData {
  id: number;
  name: string;
  age: string;
}
