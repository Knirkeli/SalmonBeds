import { Button } from "../../components/ui/button";
import Router from "next/router";

interface Booking {
  id: string;
  dateFrom: string;
  venue: {
    name: string;
  };
}

interface MyBookingsProps {
  bookings: Booking[];
}

export function MyBookings({ bookings }: MyBookingsProps) {
  return (
    <div className="shadow-xl p-4 mt-4 md:mb-16">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">My Bookings</h3>
      </div>
      {bookings.length > 0 ? (
        <div className="flex justify-center">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Venue</th>
                <th className="px-4 py-2">Check in</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const date = new Date(booking.dateFrom);
                const formattedDate = `${date.getDate()}-${
                  date.getMonth() + 1
                }-${date.getFullYear()}`;

                const venueName =
                  booking.venue.name.length > 15
                    ? `${booking.venue.name.substring(0, 15)}...`
                    : booking.venue.name;

                return (
                  <tr key={booking.id}>
                    <td className="border px-4 py-2">{venueName}</td>
                    <td className="border px-4 py-2">{formattedDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-lg">No bookings yet</p>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => Router.push("/")}
          >
            Find a venue
          </Button>
        </div>
      )}
    </div>
  );
}
