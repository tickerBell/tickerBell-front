import { userReserveApi } from "@/api/ticketing";
import { RequestPayParams, RequestPayResponse } from "@/module/iamport";
import apiInstance from "@/util/useInterceptor";
import axios from "axios";
import { useResetRecoilState, useSetRecoilState } from "recoil";

export const onClickPayment = (
  // 결제 필요 정보
  totalCost: number,
  name: string,
  eventName: string,
  // userPhone: string
  
  // 결제 정보 DB 저장
  selectedSeat: string[],
  selectedDate: string,
  merchant_uid: string,
  eventId: number
) => {
  if (!window.IMP) return;
  /* 1. 가맹점 식별하기 */
  const { IMP } = window;
  IMP.init("imp87773672"); // 가맹점 식별코드

  /* 2. 결제 데이터 정의하기 */
  const data: RequestPayParams = {
    pg: "html5_inicis", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
    pay_method: "card", // 결제수단
    merchant_uid: merchant_uid, // 주문번호
    amount: totalCost, // 결제금액
    name: eventName, // 주문명
    buyer_name: name, // 구매자 이름
    // buyer_tel: userPhone, // 구매자 전화번호
    // buyer_email: "example@example.com", // 구매자 이메일
    // buyer_addr: "신사동 661-16", // 구매자 주소
    // buyer_postcode: "06018", // 구매자 우편번호
  };

  /* 4. 결제 창 호출하기 */
  IMP.request_pay(data, async (response) => {
    try {
      await apiInstance.post("/ticketing", {
        selectedSeat: selectedSeat,
        selectedDate: selectedDate,
        paymentId: merchant_uid,
        eventId: eventId,
      });
      if (response.success) {
        alert("결제 성공");
      } else {
        alert("결제 실패");
      }
    } catch (error) {
      console.error("Error while verifying payment:", error);
      alert("결제 실패");
    }
  });
};

function callback(response: RequestPayResponse) {
  const { success, error_msg } = response;

  if (success) {
    alert("결제 성공");
    // TODO: 여기에 예매 api붙이기 => atom 에 상태를 저장할 수 없음.
    console.log("결제 성공", response);
  } else {
    alert(`결제 실패: ${error_msg}`);
  }
}

export const cancelPay = () => {
  console.log("cc");
  axios({
    // url: "{환불요청을 받을 서비스 URL}", // 예: http://www.myservice.com/payments/cancel
    url: "http://www.myservice.com/payments/cancel", // 예: http://www.myservice.com/payments/cancel
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      merchant_uid: "mid_1694711280", // 주문번호
      cancel_request_amount: 2000, // 환불금액
      reason: "테스트 결제 환불", // 환불사유
      // refund_holder: "홍길동", // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
      // refund_bank: "88", // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
      // refund_account: "56211105948400" // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
    },
  });
};
