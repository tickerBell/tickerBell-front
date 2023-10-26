interface IUserColumnsData {
  name: string;
  speaker: string;
  date: string;
  place: string;
}
interface IUserRowsData {
  id: number;
  title: string;
  speaker: string;
  startTime: string;
  place: string;
}
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
