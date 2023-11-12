interface IEventHistoryTableType {
  eventName: string;
  casting: string;
  startEvent: string;
  place: string;
}

interface IEventHistoryTableReserverType extends IEventHistoryTableType {
  ticketHolderCounts?: number | string;
  isCancelled?: boolean | string;
}

interface IUserData {
  id: number;
  name: string;
  age: string;
}
