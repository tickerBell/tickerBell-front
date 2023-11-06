import apiInstance from "@/util/useInterceptor";
import axios from "axios";

// 메인 이벤트 슬라이드
export async function eventSlideApi() {
  try {
    const res = await apiInstance.get("/api/main", {});
    return res;
  } catch (error) {
    throw error;
  }
}

// 이벤트 등록
export async function postEventApi(data: any) {
  try {
    const res = await apiInstance.post("/api/event", data);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 이벤트 id 정보
export async function getEventIdApi(id: any) {
  try {
    const res = await apiInstance.get(`/api/event/${id}`);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 카테고리별 보여주기
