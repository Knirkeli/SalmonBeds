import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">SalmonBeds</h1>
      <Image
        src="/lander1.jpg"
        alt="Salmon fishing in Norway"
        width={500}
        height={500}
        className="rounded-lg"
      />
    </main>
  );
}
