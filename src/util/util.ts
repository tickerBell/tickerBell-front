// const { API_URL } = process.env;

// alert(API_URL);

// // isPro, isDev
// export const isPro = API_URL === "production";
// export const isDev = API_URL === "development";

let isDev = false;

if (process && process.env.NODE_ENV === "development") {
  isDev = true;
}

export { isDev };
