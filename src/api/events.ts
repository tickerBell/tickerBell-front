import apiInstance from "@/util/useInterceptor";

export async function eventSlideApi() {
  try {
    const res = await apiInstance.get("/api/main", {});
    return res;
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
