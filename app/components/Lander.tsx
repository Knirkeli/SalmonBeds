// import React from "react";
// import Image from "next/image";
// import { Card } from "/components/ui/card";

// const Lander: React.FC = () => {
//   return (
//     <div className="relative flex flex-wrap h-screen z-0">
//       <Image
//         src="/cabin4.jpg"
//         alt="Rauma Hero"
//         layout="fill"
//         objectFit="cover"
//       />
//       <div className="w-full md:w-1/2 p-5 md:p-10 z-10 flex items-center justify-center mt-20 md:mt-0">
//         <Card className="w-full h-2/3 bg-pink-200 bg-opacity-55 text-center shadow-2xl hover:shadow-pink-200">
//           <h2 className="text-3xl">Find a place to stay</h2>
//           <p className="text-xl">Pick a bed close to your fishing spot!</p>
//           <Card className="bg-gray-300 bg-opacity-75 text-center">
//             <h3>Weather</h3>
//             <Image
//               src="/vannføring.png"
//               alt="Rauma Hero"
//               height={50}
//               width={50}
//               objectFit="cover"
//             />
//           </Card>
//         </Card>
//       </div>
//       <div className="w-full md:w-1/2 p-5 xs:p-5 md:p-10 z-10 flex items-center justify-center md:mt-0 mt-0">
//         <Card className="w-full h-2/3 bg-gray-500 bg-opacity-55 text-center shadow-2xl hover:shadow-gray-200">
//           <h2 className="text-2xl">Rent out?</h2>
//           <p className="text-xl">
//             Got a spot near a salmon river? We help you rent your free space to
//             eager anglers
//           </p>
//           <div></div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Lander;

import React from "react";
import Image from "next/image";
import { Card } from "../../components/ui/card";
import Link from "next/link";
import WeatherIcon from "@/components/ui/weather";

//fix sizing of cards. broken by Link

const Lander: React.FC = () => {
  return (
    <div className="relative flex flex-wrap h-screen z-0">
      <Image
        src="/cabin4.jpg"
        alt="Rauma Hero"
        layout="fill"
        objectFit="cover"
      />
      <div className="w-full md:w-1/2 p-5 md:p-10 z-10 flex items-center justify-center mt-20 md:mt-0">
        <Link href="/Venues">
          <Card className="w-full h-2/3 bg-pink-200 bg-opacity-55 text-center shadow-2xl hover:shadow-pink-200">
            <h2 className="text-3xl">Find a place to stay</h2>
            <p className="text-xl">Pick a bed close to your fishing spot!</p>
            <Card className="bg-gray-300 bg-opacity-75 text-center">
              <h3>Weather at our most popular location</h3>
              <WeatherIcon />
            </Card>
          </Card>
        </Link>
      </div>
      <div className="w-full md:w-1/2 p-5 xs:p-5 md:p-10 z-10 flex items-center justify-center md:mt-0 mt-0">
        <Link href="/Manager">
          <Card className="w-full h-2/3 bg-gray-500 bg-opacity-55 text-center shadow-2xl hover:shadow-gray-200">
            <h2 className="text-2xl">Rent out?</h2>
            <p className="text-xl">
              Got a spot near a salmon river? We help you rent your free space
              to eager anglers
            </p>
            <div></div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Lander;
