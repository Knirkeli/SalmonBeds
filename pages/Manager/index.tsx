// import { useEffect, useState } from "react";
// import { apiRequest, API_PROFILES } from "../../shared/apis";
// import Cookies from "js-cookie";
// import Router from "next/router";
// import Footer from "@/app/components/Footer";
// import Navbar from "@/app/components/Navbar";
// import "../../app/globals.css";
// import { Button, buttonVariants } from "../../components/ui/button";

// function Manager() {
//   const [profile, setProfile] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [venues, setVenues] = useState([]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userCookie = Cookies.get("user") ?? "";
//       const user = JSON.parse(decodeURIComponent(userCookie));
//       const userName = user.name;
//       const endpoint = `${API_PROFILES}/${userName}`;
//       console.log("userName:", userName);
//       console.log("API endpoint:", endpoint);
//       const data = await apiRequest(endpoint);
//       console.log("Data:", data);
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

//     const fetchVenues = async () => {
//       const userCookie = Cookies.get("user");
//       const user = JSON.parse(decodeURIComponent(userCookie));
//       const userName = user.name;
//       const endpoint = `${API_PROFILES}/${userName}/venues`;
//       const data = await apiRequest(endpoint);
//       setVenues(data.data);
//     };

//     fetchProfile();
//     fetchBookings();
//     fetchVenues();
//   }, []);

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <div>
//         <h1>{profile.name}</h1>
//         <p>{profile.email}</p>
//         <img
//           src={profile.avatar.url}
//           alt={profile.avatar.alt}
//           height={150}
//           width={150}
//         />
//         <p>{profile.bio}</p>
//         <h3>My Bookings</h3>
//         {bookings.length > 0 ? (
//           bookings.map((booking) => (
//             <div key={booking.id}>
//               <p>Venue: {booking.venue.name}</p>
//               <p>Start Date: {booking.dateFrom}</p>
//             </div>
//           ))
//         ) : (
//           <div>
//             <p>No bookings yet</p>
//             <Button onClick={() => Router.push("/Venues")}>Find a venue</Button>
//           </div>
//         )}
//         <h3>My Venues</h3>
//         {venues.length > 0 ? (
//           venues.map((venue) => (
//             <div key={venue.id}>
//               <h4>{venue.name}</h4>
//               {venue.media.length > 0 && (
//                 <img
//                   src={venue.media[0].url}
//                   alt={venue.media[0].alt}
//                   height={150}
//                   width={150}
//                 />
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No venues yet</p>
//         )}
//         <Button onClick={() => Router.push("/Create")}>Add a venue</Button>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Manager;

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import "../../app/globals.css";
import { Button, buttonVariants } from "../../components/ui/button";
import { useManagerData } from "../../app/hooks/useManagerData";

function Manager() {
  const { profile, bookings, venues } = useManagerData();

  const handleDelete = async (id) => {
    await apiRequest(`${API_VENUES}/${id}`, "DELETE");
    setVenues(venues.filter((venue) => venue.id !== id));
  };

  const handleEdit = (id) => {
    Router.push(`/Edit/${id}`);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div>
        <h1>{profile.name}</h1>
        <p>{profile.email}</p>
        <img
          src={profile.avatar.url}
          alt={profile.avatar.alt}
          height={150}
          width={150}
        />
        <p>{profile.bio}</p>
        <h3>My Bookings</h3>
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            const date = new Date(booking.dateFrom);
            const formattedDate = `${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`;

            return (
              <div key={booking.id}>
                <p>Venue: {booking.venue.name}</p>
                <p>Start Date: {formattedDate}</p>
              </div>
            );
          })
        ) : (
          <div>
            <p>No bookings yet</p>
            <Button onClick={() => Router.push("/Venues")}>Find a venue</Button>
          </div>
        )}
        <h3>My Venues</h3>
        {venues.length > 0 ? (
          venues.map((venue) => (
            <div key={venue.id}>
              <h4>{venue.name}</h4>
              {venue.media.length > 0 && (
                <img
                  src={venue.media[0].url}
                  alt={venue.media[0].alt}
                  height={150}
                  width={150}
                />
              )}
              <Button
                variant={buttonVariants.secondary}
                onClick={() => handleEdit(venue.id)}
              >
                Edit
              </Button>
              <Button
                variant={buttonVariants.danger}
                onClick={() => handleDelete(venue.id)}
              >
                Delete
              </Button>
              <Button onClick={() => Router.push(`/Venues/${venue.id}`)}>
                View Venue
              </Button>
            </div>
          ))
        ) : (
          <p>No venues yet</p>
        )}
        <Button onClick={() => Router.push("/Create")}>Add a venue</Button>
      </div>
      <Footer />
    </>
  );
}

export default Manager;

// remember to fix delete of the venues
