import apiInstance from "@/util/useInterceptor";

type EventItem = {
  category: string;
  eventName: string;
};

type DataType = EventItem[];

export async function eventApi(): Promise<DataType> {
  try {
    const res = await apiInstance.get<{ data: { saleEventList: DataType } }>(
      "/api/main",
      {}
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function postEventApi(data: any) {
  try {
    const res = await apiInstance.post("/api/event", data);

    return res.data.data.saleEventList;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
