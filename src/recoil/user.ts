import { atom, selector } from "recoil";

// UserState 타입 정의
type UserState = {
  atk: string;
  role: string;
  locationState: {
    latitude: number;
    longitude: number;
  };
};

// userState 아톰
export const userState = atom<UserState>({
  key: "userState",
  default: {
    atk: "",
    role: "",
    locationState: {
      latitude: 0,
      longitude: 0,
    },
  },
});

// selector를 사용하여 locationState.latitude를 변경
export const locationSelector = selector<any>({
  key: "locationSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user && user.locationState.latitude;
  },
  set: ({ set }, newValue) => {
    // userState를 가져와서 변경
    set(userState, (prevUserState: any) => ({
      ...prevUserState,
      locationState: {
        ...prevUserState.locationState,
        latitude: newValue,
      },
    }));
  },
});

export const roleSelector = selector<any>({
  key: "roleSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user && user.role;
  },
  set: ({ set }, newValue) => {
    set(userState, (prevUserState: any) => ({
      ...prevUserState,
      role: newValue,
    }));
  },
});
