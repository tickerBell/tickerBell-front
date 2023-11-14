import { atom, selector } from "recoil";

type LocateState = {
  locationState: {
    latitude: number;
    longitude: number;
  };
};

export const locateState = atom<LocateState>({
  key: "locateState",
  default: {
    locationState: {
      latitude: 0,
      longitude: 0,
    },
  },
});

export const locationSelector = selector({
  key: "locationSelector",
  get: ({ get }) => {
    const locateStateValue = get(locateState);
    return locateStateValue.locationState;
  },
  set: ({ set }, newLocationState: any) => {
    set(locateState, (prevLocateState) => ({
      ...prevLocateState,
      locationState: newLocationState,
    }));
  },
});
