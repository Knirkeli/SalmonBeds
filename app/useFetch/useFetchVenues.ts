// "use client";

// import { useEffect, useState } from "react";

// export function useFetch(url: string) {
//   const [data, setData] = useState({ data: [] });
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     async function getData() {
//       try {
//         setIsError(false);
//         setIsLoading(true);
//         const response = await fetch(url);
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setIsLoading(false);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     getData();
//   }, [url]);

//   return { data, isLoading, isError };
// }

"use client";

import { useEffect, useState } from "react";

interface Media {
  url: string;
  alt: string;
}

interface Venue {
  id: string;
  name: string;
  price: number;
  media: Media[];
}

interface FetchResult {
  data: Venue[];
}

export function useFetch(url: string) {
  const [data, setData] = useState<FetchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url);
        const result: FetchResult = await response.json();
        setData(result);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url]);

  return { data, isLoading, isError };
}