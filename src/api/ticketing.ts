import apiInstance from "@/util/useInterceptor";
// '예매'가 포함된 api

// 비회원: 예매
export async function noneUserReserveApi(
  selectedSeat: [],
  selectedDate: string,
  eventId: number,
  paymentId: number,
  name: string,
  phone: number
) {
  const res = await apiInstance.post("/ticketing-nonMember", {
    selectedSeat: selectedSeat,
    selectedDate: selectedDate,
    eventId: eventId,
    paymentId: paymentId,
    name: name,
    phone: phone,
  });
  return res;
}
// 비회원: 예매 내역
export async function noneUserReserveListApi(name: string, phone: number, page: number) {
  const res = await apiInstance.get("/ticketing-nonMember", {
    params: { name: name, phone: phone, page: page, size: 10 },
  });
  return res;
}
// 비회원: 예매 취소
export async function noneUserReserveDeleteApi(eventId: number, name: string, phone: number) {
  const res = await apiInstance.delete(`/ticketing-nonMember/${eventId}`, {
    params: { name: name, phone: phone },
  });
  return res;
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 회원: 예매
export async function userReserveApi(selectedSeat: [], selectedDate: string, eventId: number, paymentId: number) {
  const res = await apiInstance.post("/ticketing", {
    selectedSeat: selectedSeat,
    eventId: eventId,
    selectedDate: selectedDate,
    paymentId: paymentId,
  });
  return res;
}

// 회원: 예매자 - 예매 내역 or 등록자 - 등록 내역 조회
export async function userReserveListApi(page: number) {
  const res = await apiInstance.get("/api/member/myPage", {
    // headers: {
    //   Authorization: `Bearer ${atk}`,
    // },
    params: { page: page, size: 10 },
  });
  return res;
}

// 회원: 예매자 - 예매 취소
export async function userDeleteReserverIdApi(id: number) {
  console.log('회원 예매 취소 : ', id);
  const res = await apiInstance.delete(`/ticketing/${id}`, {});
  return res;
}

// 회원: 등록자 - 등록 내역 삭제
export async function userDeleteResigsterIdApi(id: number) {
  const res = await apiInstance.post(`/api/event/cancel/${id}`, {});
  return res;
}

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 예약된 좌석 데이터 반환
export async function reserveEventSeatReturnApi(id: number, date:any) {
  const res = await apiInstance.post(`/selected-seat`, {
    eventId: id,
    selectedDate: date,
  });
  return res;
}