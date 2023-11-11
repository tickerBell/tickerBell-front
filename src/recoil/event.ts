import { atom } from "recoil";

export const thumbnailUrlState = atom({
  key: "thumbnailUrlState",
  default: "",
});

export const imageUrlsState = atom({
  key: "imageUrlsState",
  default: [],
});
