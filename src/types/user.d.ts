interface IEventColumnsData {
  name: string;
  speaker: string;
  date: string;
  place: string;
  totaluser: string;
  maxseats: string;
  cancel: string;
}

interface IEventRowsData {
  id: number;
  startTime: string;
  place: string;
  title: string;
  speaker: string;
  maxuser: string;
  maxseats: string;
}

interface IUserData {
  id: number;
  name: string;
  age: string;
}
