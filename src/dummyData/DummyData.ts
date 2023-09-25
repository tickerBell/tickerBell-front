export const ticketDummyData = [
  {
    id: 0,
    startTime: "2023-12-11 04:12:00",
    endTime: "2023-12-11 6:12:00",
    place: "상암 공개홀",
    title: "내한 공연",
    speaker: "가수A",
    AgeOfView: "all", // all, adult, kiz
    info: "이미지첨부",
    price: {
      VIP석: 290,
      SR석: 190,
      R석: 160,
      S석: 130,
      A석: 90,
      B석: 70,
    },
  },
  {
    id: 1,
    startTime: "2023-08-11 04:12:00",
    endTime: "2023-08-11 6:12:00",
    place: "상암 공개홀",
    title: "내한 공연1",
    speaker: "가수B",
    AgeOfView: "kiz", // all, adult, kiz
    info: "이미지첨부",
    price: {
      VIP석: 290,
      SR석: 190,
      R석: 160,
      S석: 130,
      A석: 90,
      B석: 70,
    },
  },
];

export const EventColumns: IEventColumnsData[] = [
  {
    name: "이벤트명",
    speaker: "캐스팅",
    date: "일시",
    place: "장소",
    totaluser: "예매좌수",
    maxseats: "최대좌석",
    cancel: "취소",
  },
];

export const EventRows = [
  {
    id: 0,
    startTime: "2023-12-11 04:12:00",
    place: "상암 공개홀",
    title: "내한 공연",
    speaker: "가수A",
    maxp: "가수A",
    maxuser: "90명",
    maxseats: "90",
  },
  {
    id: 1,
    startTime: "2023-08-11 04:12:00",
    place: "상암 공개홀",
    title: "내한 공연1",
    speaker: "가수B",
    maxuser: "90명",
    maxseats: "90",
  },
];

export const UserDummyData: IUserData[] = [
  {
    id: 0,
    name: "홍길동",
    age: "20",
  },
];
