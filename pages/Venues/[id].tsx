// import React, { useState, useEffect, FC } from "react";
// import { useRouter } from "next/router";
// import { API_VENUES, API_BOOKINGS } from "../../shared/apis";
// import { Button } from "@/components/ui/button";
// import Navbar from "../../app/components/Navbar";
// import Footer from "../../app/components/Footer";
// import { getAccessToken, getApiKey } from "../../shared/cookies";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../../components/ui/carousel";
// import { Calendar } from "../../components/ui/calendar";
// import "../../app/globals.css";
// import WeatherIcon from "@/components/ui/weather";
// import { useVenueData } from "../../app/useFetch/useFetchId";
// import { useBooking } from "../../app/hooks/useBooking";

// const Venue: FC = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { venueData, startDate, endDate, disabledDates, isLoading } =
//     useVenueData(id);

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
//               {!isLoading && ( // Add this line
//                 <BookingCalendar
//                   unavailableDates={disabledDates}
//                   venueData={venueData}
//                   id={id}
//                 />
//               )}
//             </div>
//           </div>
//           <div>
//             <h2 className="text-2xl font-semibold mb-2 mt-4">Details</h2>
//             <p>{venueData.description}</p>
//             <p>Price: {venueData.price}</p>
//             <p>Max Guests: {venueData.maxGuests}</p>
//             <p>Rating: {venueData.rating}</p>
//           </div>
//           <div>
//             <h3>Forcast</h3>
//             <WeatherIcon />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Venue;

// function BookingCalendar({
//   unavailableDates,
//   venueData,
//   id,
// }: {
//   unavailableDates: Date[];
//   venueData: VenueData | null;
//   id: string | string[] | undefined;
// }) {
//   const { dateRange, setDateRange, handleBooking } = useBooking(venueData, id);

//   return (
//     <div className="flex items-center space-x-4">
//       <Calendar
//         mode="range"
//         selected={dateRange}
//         onSelect={setDateRange}
//         unavailableDates={unavailableDates}
//         className="rounded-md border shadow"
//       />
//       <Button variant="default" size="default" onClick={handleBooking}>
//         Book Now
//       </Button>
//     </div>
//   );
// }

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
import WeatherIcon from "@/components/ui/weather";
import { useVenueData } from "../../app/useFetch/useFetchId";
import { useBooking } from "../../app/hooks/useBooking";
import BookingCalendar from "../../app/components/BookingCalendar";
import VenueDetails from "../../app/components/VenueDetails";

const Venue: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { venueData, startDate, endDate, disabledDates, isLoading } =
    useVenueData(id);

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
            <Carousel className="w-full pb-6">
              <CarouselContent>
                {venueData?.media.map((media, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="aspect-w-2 aspect-h-1">
                      <img
                        src={media.url}
                        alt={media.alt}
                        className="w-full h-full object-cover shadow-2xl"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious>Previous</CarouselPrevious>
              <CarouselNext>Next</CarouselNext>
            </Carousel>
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Select Dates</h2>
                {!isLoading && (
                  <BookingCalendar
                    unavailableDates={disabledDates}
                    venueData={venueData}
                    id={id}
                  />
                )}
              </div>
              <div className="text-2xl font-semibold mb-2">
                <h2>Forcast</h2>
                <WeatherIcon />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 lg:ml-8">
            <VenueDetails venueData={venueData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Venue;
