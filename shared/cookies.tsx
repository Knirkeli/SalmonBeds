// import Cookies from "js-cookie";
// import { serialize } from "cookie";

// export function setAccessToken(token: string) {
//   Cookies.set("accessToken", token, { secure: true, sameSite: "strict" });
// }

// export function getAccessToken() {
//   return Cookies.get("accessToken");
// }

// export function setUser(user: any) {
//   Cookies.set(
//     "user",
//     JSON.stringify({
//       name: user.name,
//       email: user.email,
//       avatar: encodeURIComponent(user.avatar.url),
//     }),
//     { secure: true, sameSite: "strict" }
//   );
// }

// export function setApiKeyCookie(apiKey: string) {
//   Cookies.set("SalmonKey", apiKey, {
//     secure: process.env.NODE_ENV !== "development",
//     sameSite: "strict",
//   });
// }

// // Add more cookie-related functions as needed

import Cookies from "js-cookie";

export function setAccessToken(token: string) {
  Cookies.set("accessToken", token, { secure: true, sameSite: "strict" });
}

export function getAccessToken() {
  return Cookies.get("accessToken");
}

export function setUser(user: any) {
  Cookies.set(
    "user",
    JSON.stringify({
      name: user.name,
      email: user.email,
      avatar: encodeURIComponent(user.avatar.url),
    }),
    { secure: true, sameSite: "strict" }
  );
}

export function setApiKeyCookie(apiKey: string) {
  Cookies.set("SalmonKey", apiKey, {
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
}

// New function to get the API key
export function getApiKey() {
  return Cookies.get("SalmonKey");
}
