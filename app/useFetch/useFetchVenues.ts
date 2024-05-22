// "use client";

// import { useEffect, useState } from "react";
// import { API_VENUES } from '../../shared/apis'; // adjust the import path to where your api.tsx file is located

// interface Media {
//   url: string;
//   alt: string;
// }

// interface Venue {
//   id: string;
//   name: string;
//   price: number;
//   media: Media[];
// }

// interface FetchResult {
//   data: Venue[];
// }

// export function useFetch(url: string) {
//   const [data, setData] = useState<FetchResult | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     async function getData() {
//       try {
//         setIsError(false);
//         setIsLoading(true);
//         const response = await fetch(url);
//         const result: FetchResult = await response.json();
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

// interface VenueDetails {
//   id: string;
//   name: string;
//   description: string;
//   media: { url: string; alt: string }[];
//   price: number;
//   maxGuests: number;
//   rating: number;
//   created: string;
//   updated: string;
//   meta: {
//     wifi: boolean;
//     parking: boolean;
//     breakfast: boolean;
//     pets: boolean;
//   };
//   location: {
//     address: string;
//     city: string;
//     zip: string;
//     country: string;
//     continent: string;
//     lat: number;
//     lng: number;
//   };
// }

// interface FetchVenueResult {
//   data: VenueDetails;
//   meta: {};
// }

// export function useFetchVenue(id: string) {
//   const [data, setData] = useState<FetchVenueResult | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     async function getData() {
//       console.log('API_VENUES:', API_VENUES);
//       try {
//         setIsError(false);
//         setIsLoading(true);
// const response = await fetch(`${API_VENUES_BOOKINGS}/${id}`);
//         console.log('response:', response); // Add this line
//         const result: FetchVenueResult = await response.json();
//         console.log('result:', result); // Add this line
//         setData(result);
//       } catch (error) {
//         setIsLoading(false);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     getData();
//   }, [id]);

//   return { data, isLoading, isError };
// }

"use client";

import { useEffect, useState } from "react";
import { API_VENUES } from '../../shared/apis'; // adjust the import path to where your api.tsx file is located

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

interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

interface Owner {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
}

interface Customer {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
}

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: Customer;
}

interface VenueDetails {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta;
  location: Location;
  owner?: Owner;
  bookings?: Booking[];
}

interface FetchVenueResult {
  data: VenueDetails;
  meta: {};
}

export function useFetchVenues() {
  const [data, setData] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        let currentPage = 1;
        let isLastPage = false;
        const venues = [];

        while (!isLastPage) {
          const response = await fetch(`${API_VENUES}?page=${currentPage}`);
          const result: FetchResult = await response.json();
          venues.push(...result.data);
          isLastPage = result.meta.isLastPage;
          currentPage++;
        }

        setData(venues);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  return { data, isLoading, isError };
}