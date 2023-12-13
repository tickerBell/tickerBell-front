import { atom, selector, selectorFamily } from "recoil";

type PaymentState = boolean;
export const paymentState = atom<PaymentState>({
  key: "paymentState",
  default: false,
});

export const setDefaultPaymentStateSelector = selector({
  key: "setDefaultPaymentStateSelector",
  get: ({ get }) => {
    return get(paymentState);
  },
  set: ({ set }, newValue: any) => {
    set(paymentState, newValue);
  },
});
