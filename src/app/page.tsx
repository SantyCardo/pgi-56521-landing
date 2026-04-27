import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import RadialOrbitalTimeline from "@/components/RadialOrbitalTimeline";

const ProyectoSection = dynamic(() => import("@/components/ProyectoSection"));
const SectionDivider = dynamic(() => import("@/components/SectionDivider"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const ProblemaSection = dynamic(() => import("@/components/ProblemaSection"));
const ObjetivosSection = dynamic(() => import("@/components/ObjetivosSection"));
const TecnologiaSection = dynamic(() => import("@/components/TecnologiaSection"));
const MetodologiaSection = dynamic(() => import("@/components/MetodologiaSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const ContactoSection = dynamic(() => import("@/components/ContactoSection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main id="inicio">
        <RadialOrbitalTimeline />
        <ProyectoSection />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <ProblemaSection />
        <SectionDivider />
        <ObjetivosSection />
        <SectionDivider />
        <TecnologiaSection />
        <SectionDivider />
        <MetodologiaSection />
        <SectionDivider />
        <FAQSection />
        <ContactoSection />
      </main>
      <Footer />
    </>
  );
}
