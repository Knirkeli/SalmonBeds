// "use client";
// import React, { useEffect } from "react";
// import { API_VENUES } from "@/shared/apis";
// import { useFetch } from "@/app/useFetch/useFetchVenues";
// import { Card, CardTitle, CardDescription } from "@/components/ui/card";
// import "../app/globals.css";
// import Link from "next/link";

// export default function Venues() {
//   const { data, isLoading, isError } = useFetch(API_VENUES);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error loading data.</div>;
//   }

//   return (
//     <div className="flex flex-wrap justify-center space-x-4 space-y-4">
//       <h1 className="w-full text-center text-4xl">Venues</h1>
//       {data &&
//         data.data.map((venue) => (
//           <Link href={`/Venues/${venue.id}`} key={venue.id}>
//             <Card
//               className="flex border border-gray-300 rounded p-4 mb-4 max-w-md m-auto"
//               key={venue.id}
//             >
//               <CardTitle className="text-lg font-semibold mb-2">
//                 {venue.name}
//               </CardTitle>
//               <CardDescription className="text-base mb-2">
//                 Price: {venue.price} NOK/Night
//               </CardDescription>
//               {venue.media.map((media, index) => (
//                 <img
//                   className="w-20 h-25"
//                   key={index}
//                   src={media.url}
//                   alt={media.alt}
//                 />
//               ))}
//             </Card>
//           </Link>
//         ))}
//     </div>
//   );
// }

// "use client";
// import React, { useEffect } from "react";
// import { API_VENUES } from "@/shared/apis";
// import { useFetch } from "@/app/useFetch/useFetchVenues";
// import { Card, CardTitle, CardDescription } from "@/components/ui/card";
// import "../app/globals.css";
// import Link from "next/link";

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

// interface FetchData {
//   data: Venue[];
// }

// export default function Venues() {
//   const { data, isLoading, isError } = useFetch(API_VENUES);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error loading data.</div>;
//   }

//   return (
//     <div className="flex flex-wrap justify-center space-x-4 space-y-4">
//       <h1 className="w-full text-center text-4xl">Venues</h1>
//       {data &&
//         data.data.map((venue) => (
//           <Link
//             href={`/Venues/${(venue as Venue).id}`}
//             key={(venue as Venue).id}
//           >
//             <Card
//               className="flex border border-gray-300 rounded p-4 mb-4 max-w-md m-auto"
//               key={(venue as Venue).id}
//             >
//               <CardTitle className="text-lg font-semibold mb-2">
//                 {(venue as Venue).name}
//               </CardTitle>
//               <CardDescription className="text-base mb-2">
//                 Price: {venue && venue.price ? venue.price : "N/A"} NOK/Night
//               </CardDescription>
//               {data &&
//                 data &&
//                 data.data.map((venue: Venue) => (
//                   <Link href={`/Venues/${venue.id}`} key={venue.id}>
//                     <Card
//                       className="flex border border-gray-300 rounded p-4 mb-4 max-w-md m-auto"
//                       key={venue.id}
//                     >
//                       <CardTitle className="text-lg font-semibold mb-2">
//                         {venue.name}
//                       </CardTitle>
//                       <CardDescription className="text-base mb-2">
//                         Price: {venue.price} NOK/Night
//                       </CardDescription>
//                       {venue.media && // Add a null check for the media property
//                         venue.media.map((media: Media, index: number) => (
//                           <img
//                             className="w-20 h-25"
//                             key={index}
//                             src={media.url}
//                             alt={media.alt}
//                           />
//                         ))}
//                     </Card>
//                   </Link>
//                 ))}
//             </Card>
//           </Link>
//         ))}
//     </div>
//   );
// }

"use client";
import React from "react";
import { API_VENUES } from "@/shared/apis";
import { useFetch } from "@/app/useFetch/useFetchVenues";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import "../app/globals.css";
import Link from "next/link";

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

interface FetchData {
  data: Venue[];
}

const VenueCard: React.FC<{ venue: Venue }> = ({ venue }) => (
  <Link href={`/Venues/${venue.id}`} key={venue.id}>
    <Card className="flex border border-gray-300 rounded p-4 mb-4 max-w-md m-auto">
      <CardTitle className="text-lg font-semibold mb-2">{venue.name}</CardTitle>
      <CardDescription className="text-base mb-2">
        Price: {venue.price ? venue.price : "N/A"} NOK/Night
      </CardDescription>
      {venue.media &&
        venue.media.map((media: Media, index: number) => (
          <img
            className="w-20 h-25"
            key={index}
            src={media.url}
            alt={media.alt}
          />
        ))}
    </Card>
  </Link>
);

export default function Venues() {
  const { data, isLoading, isError } = useFetch(API_VENUES);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="flex flex-wrap justify-center space-x-4 space-y-4">
      <h1 className="w-full text-center text-4xl">Venues</h1>
      {data &&
        data.data.map((venue) => <VenueCard venue={venue} key={venue.id} />)}
    </div>
  );
}
