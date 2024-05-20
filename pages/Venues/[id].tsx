// import React, { useState, useEffect, FC } from "react";
// import { useRouter } from "next/router";
// import { API_VENUES, API_BOOKINGS } from "../../shared/apis";
// import { Button } from "@/components/ui/button";
// import Navbar from "../../app/components/Navbar";
// import Footer from "../../app/components/Footer";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../../components/ui/carousel";
// import { Calendar } from "../../components/ui/calendar";
// import "../../app/globals.css";

// interface VenueData {
//   name: string;
//   description: string;
//   price: number;
//   maxGuests: number;
//   rating: number;
//   location: {
//     address: string;
//     city: string;
//     country: string;
//   };
//   meta: {
//     wifi: boolean;
//     parking: boolean;
//     breakfast: boolean;
//     pets: boolean;
//   };
//   media: {
//     url: string;
//     alt: string;
//   }[];
//   bookings: {
//     dateFrom: string;
//     dateTo: string;
//   }[];
// }

// interface CalendarProps {
//   selectedDays: Date[];
//   onDayClick: (date: Date) => void;
//   unavailableDates: Date[];
// }

// const Venue: FC = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [venueData, setVenueData] = useState<VenueData | null>(null);
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [disabledDates, setDisabledDates] = useState<Date[]>([]);

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
//     }

//     if (id) {
//       fetchVenueData();
//     }
//   }, [id]);

//   if (!venueData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-16">
//         <h1 className="text-4xl font-bold mb-4">{venueData.name}</h1>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//           <div className="lg:col-span-2 lg:mr-8">
//             <Carousel className="w-full h-full">
//               <CarouselContent>
//                 {venueData?.media.map((media, index) => (
//                   <CarouselItem key={index} className="h-full">
//                     <div className="aspect-w-2 aspect-h-1">
//                       <img
//                         src={media.url}
//                         alt={media.alt}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious>Previous</CarouselPrevious>
//               <CarouselNext>Next</CarouselNext>
//             </Carousel>
//           </div>
//           <div className="lg:col-span-1 lg:ml-8">
//             <div>
//               <h2 className="text-2xl font-semibold mb-2">Location</h2>
//               <p>Address: {venueData.location.address}</p>
//               <p>City: {venueData.location.city}</p>
//               <p>Country: {venueData.location.country}</p>
//             </div>
//             <div>
//               <h2 className="text-2xl font-semibold mb-2 mt-4">Amenities</h2>
//               <p>Wifi: {venueData.meta.wifi ? "Yes" : "No"}</p>
//               <p>Parking: {venueData.meta.parking ? "Yes" : "No"}</p>
//               <p>Breakfast: {venueData.meta.breakfast ? "Yes" : "No"}</p>
//               <p>Pets: {venueData.meta.pets ? "Yes" : "No"}</p>
//             </div>
//             <div>
//               <h2 className="text-2xl font-semibold mb-2 mt-4">Select Dates</h2>
//               <BookingCalendar unavailableDates={disabledDates} />
//               <Button className="mt-4" variant="default" size="default">
//                 Book Now
//               </Button>
//             </div>
//           </div>
//           <div>
//             <h2 className="text-2xl font-semibold mb-2 mt-4">Details</h2>
//             <p>{venueData.description}</p>
//             <p>Price: {venueData.price}</p>
//             <p>Max Guests: {venueData.maxGuests}</p>
//             <p>Rating: {venueData.rating}</p>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Venue;

// export function BookingCalendar({
//   unavailableDates,
// }: {
//   unavailableDates: Date[];
// }) {
//   const [dateRange, setDateRange] = useState<
//     { from: Date; to: Date } | undefined
//   >(undefined);

//   return (
//     <Calendar
//       mode="range"
//       selected={dateRange}
//       onSelect={setDateRange}
//       unavailableDates={unavailableDates}
//       className="rounded-md border shadow"
//     />
//   );
// }
// Remember to fix the booked dates in the calendar

import React, { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import { API_VENUES, API_BOOKINGS } from "../../shared/apis";
import { Button } from "@/components/ui/button";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import { getAccessToken, getApiKey } from "../../shared/cookies";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Calendar } from "../../components/ui/calendar";
import "../../app/globals.css";

interface VenueData {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating: number;
  location: {
    address: string;
    city: string;
    country: string;
  };
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  media: {
    url: string;
    alt: string;
  }[];
  bookings: {
    dateFrom: string;
    dateTo: string;
  }[];
}

interface CalendarProps {
  selectedDays: Date[];
  onDayClick: (date: Date) => void;
  unavailableDates: Date[];
}

const Venue: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [venueData, setVenueData] = useState<VenueData | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  function getDatesBetweenDates(startDate: Date, endDate: Date) {
    let dates = [];
    const currDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currDate <= lastDate) {
      dates.push(new Date(currDate));
      currDate.setDate(currDate.getDate() + 1);
    }

    return dates;
  }

  useEffect(() => {
    async function fetchVenueData() {
      const response = await fetch(`${API_VENUES}/${id}?_bookings=true`);
      const data = await response.json();
      console.log(data);
      setVenueData(data.data);

      const disabledDates = data.data.bookings
        .map((booking) =>
          getDatesBetweenDates(
            new Date(booking.dateFrom),
            new Date(booking.dateTo)
          )
        )
        .flat();

      setDisabledDates(disabledDates);
    }

    if (id) {
      fetchVenueData();
    }
  }, [id]);

  if (!venueData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-16">
        <h1 className="text-4xl font-bold mb-4">{venueData.name}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 lg:mr-8">
            <Carousel className="w-full h-full">
              <CarouselContent>
                {venueData?.media.map((media, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="aspect-w-2 aspect-h-1">
                      <img
                        src={media.url}
                        alt={media.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious>Previous</CarouselPrevious>
              <CarouselNext>Next</CarouselNext>
            </Carousel>
          </div>
          <div className="lg:col-span-1 lg:ml-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Location</h2>
              <p>Address: {venueData.location.address}</p>
              <p>City: {venueData.location.city}</p>
              <p>Country: {venueData.location.country}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 mt-4">Amenities</h2>
              <p>Wifi: {venueData.meta.wifi ? "Yes" : "No"}</p>
              <p>Parking: {venueData.meta.parking ? "Yes" : "No"}</p>
              <p>Breakfast: {venueData.meta.breakfast ? "Yes" : "No"}</p>
              <p>Pets: {venueData.meta.pets ? "Yes" : "No"}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 mt-4">Select Dates</h2>
              <BookingCalendar
                unavailableDates={disabledDates}
                venueData={venueData}
                id={id}
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 mt-4">Details</h2>
            <p>{venueData.description}</p>
            <p>Price: {venueData.price}</p>
            <p>Max Guests: {venueData.maxGuests}</p>
            <p>Rating: {venueData.rating}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Venue;

function BookingCalendar({
  unavailableDates,
  venueData,
  id,
}: {
  unavailableDates: Date[];
  venueData: VenueData | null;
  id: string | string[] | undefined;
}) {
  const [dateRange, setDateRange] = useState<
    { from: Date; to: Date } | undefined
  >(undefined);

  const handleBooking = async () => {
    if (!dateRange) {
      alert("Please select a date range first.");
      return;
    }

    const token = getAccessToken();
    const apiKey = getApiKey();

    const response = await fetch(API_BOOKINGS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify({
        dateFrom: dateRange.from.toISOString(),
        dateTo: dateRange.to.toISOString(),
        guests: venueData.maxGuests, // Use the actual number of guests from venue data
        venueId: id, // Use the actual venue ID from router query
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    window.alert("Booking successful!");
  };

  return (
    <div className="flex items-center space-x-4">
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        unavailableDates={unavailableDates}
        className="rounded-md border shadow"
      />
      <Button variant="default" size="default" onClick={handleBooking}>
        Book Now
      </Button>
    </div>
  );
}
