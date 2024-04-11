import React from "react";
import Image from "next/image";
import { Card } from "/components/ui/card";

const Lander: React.FC = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-60px-41px)]">
      <Image
        src="/Rauma_hero.jpg"
        alt="Rauma Hero"
        layout="fill"
        objectFit="fill"
      />
      <div className="w-1/2 p-10 z-10">
        <Card className="h-2/3 bg-pink-200 bg-opacity-55 text-center shadow-2xl hover:shadow-pink-200">
          <h2 className="text-3xl">Find a place to stay</h2>
          <p className="text-xl">Pick a bed close to your fishing spot!</p>
        </Card>
      </div>
      <div className="w-1/2 p-10 z-10">
        <Card className="h-2/3 bg-gray-500 bg-opacity-55 text-center shadow-2xl hover:shadow-gray-200">
          <h2 className="text-2xl">Rent out?</h2>
          <p className="text-xl">
            Got a spot near a salmon river? We help you rent your free space to
            eager anglers
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Lander;
