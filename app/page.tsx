// app/page.tsx
import LandingLayout from "./LandingLayout";
import Lander from "./components/Lander";

export default function Home() {
  return (
    <LandingLayout>
      <Lander />
    </LandingLayout>
  );
}
