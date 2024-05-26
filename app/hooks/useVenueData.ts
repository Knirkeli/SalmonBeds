// // useVenueData.ts
// import { useState, useEffect } from "react";
// import { API_VENUES } from "../../shared/apis";

// interface VenueData {
//     name: string;
//     description: string;
//     price: number;
//     maxGuests: number;
//     rating: number;
//     location: {
//       address: string;
//       city: string;
//       country: string;
//     };
//     meta: {
//       wifi: boolean;
//       parking: boolean;
//       breakfast: boolean;
//       pets: boolean;
//     };
//     media: {
//       url: string;
//       alt: string;
//     }[];
//     bookings: {
//       dateFrom: string;
//       dateTo: string;
//     }[];
//   }
  
//   interface CalendarProps {
//     selectedDays: Date[];
//     onDayClick: (date: Date) => void;
//     unavailableDates: Date[];
//   }

// export function useVenueData(id: string | string[] | undefined) {
//   const [venueData, setVenueData] = useState<VenueData | null>(null);
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [disabledDates, setDisabledDates] = useState<Date[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   function getDatesBetweenDates(startDate: Date, endDate: Date) {
//     let dates = [];
//     const currDate = new Date(startDate);
//     const lastDate = new Date(endDate);

//     while (currDate <= lastDate) {
//       dates.push(new Date(currDate));
//       currDate.setDate(currDate.getDate() + 1);
//     }

//     return dates;
//   }

//   useEffect(() => {
//     async function fetchVenueData() {
//       setIsLoading(true);
//       const response = await fetch(`${API_VENUES}/${id}?_bookings=true`);
//       const data = await response.json();
//       console.log(data);
//       setVenueData(data.data);

//       const disabledDates = data.data.bookings
//         .map((booking) =>
//           getDatesBetweenDates(
//             new Date(booking.dateFrom),
//             new Date(booking.dateTo)
//           )
//         )
//         .flat();

//       setDisabledDates(disabledDates);
//       setIsLoading(false);
//     }

//     if (id) {
//       fetchVenueData();
//     }
//   }, [id]);

//   return { venueData, startDate, endDate, disabledDates, isLoading };