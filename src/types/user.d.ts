interface IEventHistoryTableType {
  eventId?: number;
  eventName: string;
  casting: string;
  startEvent: string;
  place: string;
}

interface IEventHistoryTableReserverType extends IEventHistoryTableType {
  ticketHolderCounts?: number | string;
  isCancelled?: boolean | string;
  ticketingId?: number;
}

interface IUserData {
  id: number;
  name: string;
  age: string;
}
