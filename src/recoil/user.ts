import { atom } from "recoil";

export type kakaologinTypes = {
  kakaoid: string;
};

// TodoInput에서 입력하는 값을 atom으로 관리하는 방식
export const kakaologinState = atom<{}>({
  key: "kakaologinState",
  default: {
    kakaoid: '',
  },
});
