// import { FC, useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "../../components/ui/calendar";
// import { useBooking } from "../../app/hooks/useBooking";

// interface BookingCalendarProps {
//   unavailableDates: Date[];
//   venueData: VenueData | null;
//   id: string | string[] | undefined;
// }

// const BookingCalendar: FC<BookingCalendarProps> = ({
//   unavailableDates,
//   venueData,
//   id,
// }) => {
//   const { dateRange, setDateRange, handleBooking } = useBooking(venueData, id);
//   const [finalUnavailableDates, setFinalUnavailableDates] = useState<Date[]>(
//     []
//   );

//   useEffect(() => {
//     const now = new Date();
//     now.setHours(0, 0, 0, 0); // set the time to 00:00:00.000

//     const twoMonthsAgo = new Date(now);
//     twoMonthsAgo.setMonth(now.getMonth() - 2); // set the date to two months ago

//     // Generate all dates from two months ago until yesterday
//     let pastDates: Date[] = [];
//     for (
//       let dt = new Date(twoMonthsAgo);
//       dt < now;
//       dt.setDate(dt.getDate() + 1)
//     ) {
//       pastDates.push(new Date(dt));
//     }

//     // Combine past dates and unavailable dates
//     setFinalUnavailableDates([...unavailableDates, ...pastDates]);
//   }, [unavailableDates]);

//   const handleBookingWithCheck = () => {
//     if (!dateRange.from || !dateRange.to) {
//       alert("Please select the date of departure.");
//     } else {
//       handleBooking();
//     }
//   };

//   return (
//     <div className="flex items-center space-x-4">
//       <Calendar
//         mode="range"
//         selected={dateRange}
//         onSelect={setDateRange}
//         unavailableDates={finalUnavailableDates} // Use finalUnavailableDates here
//         className="rounded-md border shadow"
//       />
//       <Button variant="default" size="default" onClick={handleBookingWithCheck}>
//         Book Now
//       </Button>
//     </div>
//   );
// };

// export default BookingCalendar;

import React, { FC, useState, useEffect, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { useBooking } from "../../app/hooks/useBooking";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";
import Cookies from "js-cookie";
import { PopoverTrigger } from "@/components/ui/popover";
import { PersonIcon } from "@radix-ui/react-icons";

const Popover = React.lazy(() =>
  import("@/components/ui/popover").then((module) => ({
    default: module.Popover,
  }))
);
const PopoverContent = React.lazy(() =>
  import("@/components/ui/popover").then((module) => ({
    default: module.PopoverContent,
  }))
);
const LoginForm = React.lazy(() => import("./Login"));

interface BookingCalendarProps {
  unavailableDates: Date[];
  venueData: VenueData | null;
  id: string | string[] | undefined;
}

const BookingCalendar: FC<BookingCalendarProps> = ({
  unavailableDates,
  venueData,
  id,
}) => {
  const { dateRange, setDateRange, handleBooking } = useBooking(venueData, id);
  const [finalUnavailableDates, setFinalUnavailableDates] = useState<Date[]>(
    []
  );
  const [showAlert, setShowAlert] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // set the time to 00:00:00.000

    const twoMonthsAgo = new Date(now);
    twoMonthsAgo.setMonth(now.getMonth() - 2); // set the date to two months ago

    // Generate all dates from two months ago until yesterday
    let pastDates: Date[] = [];
    for (
      let dt = new Date(twoMonthsAgo);
      dt < now;
      dt.setDate(dt.getDate() + 1)
    ) {
      pastDates.push(new Date(dt));
    }

    // Combine past dates and unavailable dates
    setFinalUnavailableDates([...unavailableDates, ...pastDates]);
  }, [unavailableDates]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      const handleClickOutside = (event: MouseEvent) => {
        if (
          alertRef.current &&
          !alertRef.current.contains(event.target as Node)
        ) {
          setShowAlert(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showAlert]);

  const handleBookingWithCheck = () => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      setShowAlert(true);
    } else {
      handleBooking();
    }
  };

  // Check if accessToken cookie exists
  const isLoggedIn = !!Cookies.get("accessToken");

  return (
    <div className="relative flex flex-col items-center">
      {showAlert && (
        <div className="absolute z-10 w-full h-full flex items-center justify-center text-center text-3xl">
          <div className="backdrop-filter backdrop-blur bg-black bg-opacity-50 p-4 rounded-md">
            <Alert ref={alertRef} variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Please select both arrival and departure dates.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
      <div>
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          unavailableDates={finalUnavailableDates} // Use finalUnavailableDates here
          className="rounded-md border shadow mb-4 shadow-lg"
        />
      </div>
      <div>
        {isLoggedIn ? (
          <Button
            className="shadow-lg"
            variant="default"
            size="default"
            onClick={handleBookingWithCheck}
          >
            Book Now
          </Button>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <Popover>
              <PopoverTrigger
                as="div"
                className="shadow-lg bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
              >
                Log In
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-lg rounded-lg p-4">
                <LoginForm />
              </PopoverContent>
            </Popover>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
