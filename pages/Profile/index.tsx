// "use client";
// import { useEffect, useState } from "react";
// import { apiRequest, API_PROFILES, API_VENUES } from "../../shared/apis";
// import Cookies from "js-cookie";
// import Router from "next/router";
// import Footer from "@/app/components/Footer";
// import Navbar from "@/app/components/Navbar";
// import "../../app/globals.css";
// import { Button, buttonVariants } from "../../components/ui/button";

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userCookie = Cookies.get("user") ?? "";
//       const user = JSON.parse(decodeURIComponent(userCookie));
//       const userName = user.name;
//       const endpoint = `${API_PROFILES}/${userName}`;
//       const data = await apiRequest(endpoint);
//       setProfile(data.data);
//     };

//     const fetchBookings = async () => {
//       const userCookie = Cookies.get("user");
//       const user = JSON.parse(decodeURIComponent(userCookie));
//       const userName = user.name;
//       const endpoint = `${API_PROFILES}/${userName}/bookings?_venue=true`;
//       const data = await apiRequest(endpoint);
//       setBookings(data.data);
//     };

//     fetchProfile();
//     fetchBookings();
//   }, []);

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-4">
//       <img
//         className="w-24 h-24 rounded-full"
//         src={profile.avatar.url}
//         alt={profile.avatar.alt}
//       />
//       <h2 className="text-2xl font-bold">{profile.name}</h2>
//       <p>{profile.email}</p>
//       <div>
//         <h3 className="text-xl font-bold">Bookings:</h3>
//         {bookings &&
//           bookings.map((booking) => (
//             <div key={booking.id}>
//               <p>
//                 {booking.dateFrom} - {booking.dateTo}
//               </p>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Profile;

"use client";
import { useEffect, useState } from "react";
import { apiRequest, API_PROFILES, API_VENUES } from "../../shared/apis";
import Cookies from "js-cookie";
import Router from "next/router";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import "../../app/globals.css";
import { Button, buttonVariants } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const userCookie = Cookies.get("user") ?? "";
      const user = JSON.parse(decodeURIComponent(userCookie));
      const userName = user.name;
      const endpoint = `${API_PROFILES}/${userName}`;
      const data = await apiRequest(endpoint);
      setProfile(data.data);
    };

    const fetchBookings = async () => {
      const userCookie = Cookies.get("user");
      const user = JSON.parse(decodeURIComponent(userCookie));
      const userName = user.name;
      const endpoint = `${API_PROFILES}/${userName}/bookings?_venue=true`;
      const data = await apiRequest(endpoint);
      setBookings(data.data);
    };

    fetchProfile();
    fetchBookings();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <img
        className="w-24 h-24 rounded-full"
        src={profile.avatar.url}
        alt={profile.avatar.alt}
      />
      <h2 className="text-2xl font-bold">{profile.name}</h2>
      <p>{profile.email}</p>
      <div>
        <h3 className="text-xl font-bold">Bookings:</h3>
        {bookings &&
          bookings.map((booking) => (
            <div key={booking.id}>
              <p>
                {booking.dateFrom} - {booking.dateTo}
              </p>
            </div>
          ))}
      </div>
      <BookingCalendar />
    </div>
  );
};

export default Profile;

export function BookingCalendar() {
  const [dateRange, setDateRange] = useState<
    { from: Date; to: Date } | undefined
  >(undefined);

  return (
    <Calendar
      mode="range"
      selected={dateRange}
      onSelect={setDateRange}
      className="rounded-md border shadow"
    />
  );
}
