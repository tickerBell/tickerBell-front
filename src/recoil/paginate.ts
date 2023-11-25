import { atom, selector } from "recoil";

type PaginateState = {
  historyTable: {
    paging: number;
  };
};

export const paginateState = atom<PaginateState>({
  key: "paginateState",
  default: {
    historyTable: {
      paging: 0,
    },
  },
});

export const paginateSelector = selector({
  key: "paginateSelector",
  get: ({ get }) => {
    const paginateStateValue = get(paginateState);
    return paginateStateValue.historyTable.paging;
  },
  set: ({ set }, paging: any) => {
    set(paginateState, (prevState) => ({
      ...prevState,
      historyTable: {
        ...prevState.historyTable,
        paging,
      },
    }));
  },
});
