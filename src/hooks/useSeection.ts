export const setSession = (key: string, data: any) => {
  if (typeof Storage !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

export const getSession = (key: string) => {
  if (typeof Storage !== "undefined") {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }
  return null;
};
