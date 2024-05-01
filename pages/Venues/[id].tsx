// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { API_VENUES } from "../../shared/apis";
// import Navbar from "../../app/components/Navbar";
// import Footer from "../../app/components/Footer";
// import "../../app/globals.css";

// const Venue = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [venueData, setVenueData] = useState(null);

//   useEffect(() => {
//     async function fetchVenueData() {
//       const response = await fetch(`${API_VENUES}/${id}`);
//       const data = await response.json();
//       setVenueData(data.data);
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
//       <div style={{ padding: "20px" }}>
//         <h1>{venueData.name}</h1>
//         <p>{venueData.description}</p>
//         <p>Price: {venueData.price}</p>
//         <p>Max Guests: {venueData.maxGuests}</p>
//         <p>Rating: {venueData.rating}</p>
//         <p>Address: {venueData.location.address}</p>
//         <p>City: {venueData.location.city}</p>
//         <p>Country: {venueData.location.country}</p>
//         <p>Wifi: {venueData.meta.wifi ? "Yes" : "No"}</p>
//         <p>Parking: {venueData.meta.parking ? "Yes" : "No"}</p>
//         <p>Breakfast: {venueData.meta.breakfast ? "Yes" : "No"}</p>
//         <p>Pets: {venueData.meta.pets ? "Yes" : "No"}</p>
//         {venueData.media.map((media, index) => (
//           <img
//             key={index}
//             src={media.url}
//             alt={media.alt}
//             style={{ width: "100%", height: "auto" }}
//           />
//         ))}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Venue;

import React, { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import { API_VENUES } from "../../shared/apis";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
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
}

const Venue: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [venueData, setVenueData] = useState<VenueData | null>(null);

  useEffect(() => {
    async function fetchVenueData() {
      const response = await fetch(`${API_VENUES}/${id}`);
      const data = await response.json();
      setVenueData(data.data);
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
      <div style={{ padding: "20px" }}>
        <h1>{venueData.name}</h1>
        <p>{venueData.description}</p>
        <p>Price: {venueData.price}</p>
        <p>Max Guests: {venueData.maxGuests}</p>
        <p>Rating: {venueData.rating}</p>
        <p>Address: {venueData.location.address}</p>
        <p>City: {venueData.location.city}</p>
        <p>Country: {venueData.location.country}</p>
        <p>Wifi: {venueData.meta.wifi ? "Yes" : "No"}</p>
        <p>Parking: {venueData.meta.parking ? "Yes" : "No"}</p>
        <p>Breakfast: {venueData.meta.breakfast ? "Yes" : "No"}</p>
        <p>Pets: {venueData.meta.pets ? "Yes" : "No"}</p>
        {venueData.media.map((media, index) => (
          <img
            key={index}
            src={media.url}
            alt={media.alt}
            style={{ width: "100%", height: "auto" }}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Venue;
