import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PartnersMarquee } from "@/components/PartnersMarquee";
import { SelectedWorks } from "@/components/SelectedWorks";
import { RegistrationSteps } from "@/components/RegistrationSteps";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative flex flex-col">
      <Navbar />
      <Hero />
      <PartnersMarquee />
      <SelectedWorks />
      <RegistrationSteps />
    </main>
  );
}
