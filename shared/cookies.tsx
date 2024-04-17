import Cookies from "js-cookie";

export function setAccessToken(token: string) {
  Cookies.set("accessToken", token, { secure: true, sameSite: "strict" });
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

// Add more cookie-related functions as needed
