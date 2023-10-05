import { atom } from "recoil";

type atomState = {
  atk: string;
}

export const userState = atom<atomState>({
  key: "userState",
  default: {
    atk: '',
  },
});
