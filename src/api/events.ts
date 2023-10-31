import apiInstance from "@/util/useInterceptor";
import axios from "axios";

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
  // export async function postEventApi() {
  console.log("apidata", data);
  try {
    const res = await apiInstance.post("/api/event", data);
    // const res = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
