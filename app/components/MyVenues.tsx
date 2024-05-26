// import { Button, buttonVariants } from "../../components/ui/button";
// import Router from "next/router";

// export function MyVenues({ venues, handleEdit, handleDelete }) {
//   return (
//     <>
//       <h3 className="text-2xl font-bold mb-2">My Venues</h3>
//       {venues.length > 0 ? (
//         venues.map((venue) => (
//           <div key={venue.id} className="mb-4">
//             <h4 className="text-lg font-bold">{venue.name}</h4>
//             {venue.media.length > 0 && (
//               <img
//                 src={venue.media[0].url}
//                 alt={venue.media[0].alt}
//                 className="h-36 w-36 object-cover rounded mb-4"
//               />
//             )}
//             <Button
//               variant={buttonVariants.secondary}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//               onClick={() => handleEdit(venue.id)}
//             >
//               Edit
//             </Button>
//             <Button
//               variant={buttonVariants.danger}
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
//               onClick={() => handleDelete(venue.id)}
//             >
//               Delete
//             </Button>
//             <Button
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//               onClick={() => Router.push(`/Venues/${venue.id}`)}
//             >
//               View Venue
//             </Button>
//           </div>
//         ))
//       ) : (
//         <p className="text-lg">No venues yet</p>
//       )}
//       <Button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={() => Router.push("/Create")}
//       >
//         Add a venue
//       </Button>
//     </>
//   );
// }

import { useState } from "react";
import { Button, buttonVariants } from "../../components/ui/button";
import Create from "./CreateVenue";
import Router from "next/router";
import Modal from "react-modal";

export function MyVenues({ venues, handleEdit, handleDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="shadow-xl p-4 mt-4 mb-16 flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold mb-2">My Venues</h3>
      {venues.length > 0 ? (
        venues.map((venue) => (
          <div key={venue.id} className="mb-4">
            <h4 className="text-lg font-bold">{venue.name}</h4>
            {venue.media.length > 0 && (
              <img
                src={venue.media[0].url}
                alt={venue.media[0].alt}
                className="h-36 w-36 object-cover rounded mb-4"
              />
            )}
            <Button
              variant={buttonVariants.secondary}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => handleEdit(venue.id)}
            >
              Edit
            </Button>
            <Button
              variant={buttonVariants.danger}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => handleDelete(venue.id)}
            >
              Delete
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => Router.push(`/Venues/${venue.id}`)}
            >
              View Venue
            </Button>
          </div>
        ))
      ) : (
        <p className="text-lg">No venues yet</p>
      )}
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Add a venue
      </Button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <Create closeModal={closeModal} />
      </Modal>
    </div>
  );
}
