import apiInstance from "@/util/useInterceptor";
import axios from "axios";

type EventItem = {
  category: string;
  eventName: string;
};

type DataType = EventItem[];

export async function eventApi(): Promise<DataType> {
  try {
    const res = await axios.get<{ data: { saleEventList: DataType } }>(
      "http://3.37.206.141:8080/api/main",
      {}
    );
    console.log(res.data.data.saleEventList);
    return res.data.data.saleEventList;
  } catch (error) {
    console.error(error); // 에러가 발생한 경우 콘솔에 에러 메시지를 출력합니다.
    throw error;
  }
}
export async function postEventApi(data: any) {
  try {
    const res = await axios.post("http://3.37.206.141:8080/api/event", data);

    return res.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
