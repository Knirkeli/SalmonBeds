// import Cookies from "js-cookie";

// const API_BASE_URL = "https://v2.api.noroff.dev";

// export const API_VENUES = `${API_BASE_URL}/holidaze/venues`;

// export const API_PROFILES = `${API_BASE_URL}/holidaze/profiles`;

// export const API_BOOKINGS = `${API_BASE_URL}/holidaze/bookings`;

// export const API_REGISTER = `${API_BASE_URL}/auth/register`;

// export const API_LOGIN = `${API_BASE_URL}/auth/login`;

// export const API_KEY = `${API_BASE_URL}/auth/create-api-key`;

// export async function apiRequest(
//   endpoint: string,
//   method = "GET",
//   body = null
// ) {
//   const accessToken = Cookies.get("accessToken");
//   const apiKey = Cookies.get("SalmonKey");

//   const options = {
//     method,
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "X-Noroff-API-Key": apiKey,
//       "Content-Type": "application/json",
//     },
//     body: body ? JSON.stringify(body) : null,
//   };

//   const response = await fetch(endpoint, {
//     ...options,
//     headers: {
//       ...options.headers,
//       "X-Noroff-API-Key": apiKey || "", // Ensure apiKey is always a string
//     },
//   });
//   if (!response.ok) {
//     throw new Error(`An error has occurred: ${response.status}`);
//   }

//   return await response.json();
// }

import Cookies from "js-cookie";

const API_BASE_URL = "https://v2.api.noroff.dev";

export const API_VENUES = `${API_BASE_URL}/holidaze/venues`;

export const API_PROFILES = `${API_BASE_URL}/holidaze/profiles`;

export const API_BOOKINGS = `${API_BASE_URL}/holidaze/bookings`;

export const API_REGISTER = `${API_BASE_URL}/auth/register`;

export const API_LOGIN = `${API_BASE_URL}/auth/login`;

export const API_KEY = `${API_BASE_URL}/auth/create-api-key`;

export async function apiRequest(
  endpoint: string,
  method = "GET",
  body = null
) {
  const accessToken = Cookies.get("accessToken");
  const apiKey = Cookies.get("SalmonKey");

  const options = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      "X-Noroff-API-Key": apiKey || "", // Ensure apiKey is always a string
    },
  });

  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }

  // Check if the response body is empty
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}
