import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import HeroTechnical from "@/components/HeroTechnical";

const ProyectoSection = dynamic(() => import("@/components/ProyectoSection"));
const SectionDivider = dynamic(() => import("@/components/SectionDivider"));
const ProblemaSection = dynamic(() => import("@/components/ProblemaSection"));
const ObjetivosSection = dynamic(() => import("@/components/ObjetivosSection"));
const TecnologiaSection = dynamic(() => import("@/components/TecnologiaSection"));

const JustificacionSection = dynamic(() => import("@/components/JustificacionSection"));
const PreguntaInvestigacionSection = dynamic(() => import("@/components/PreguntaInvestigacionSection"));
const CronogramaSection = dynamic(() => import("@/components/CronogramaSection"));
const AlcanceSection = dynamic(() => import("@/components/AlcanceSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const ContactoSection = dynamic(() => import("@/components/ContactoSection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main id="inicio">
        <HeroTechnical />
        <ProyectoSection />
        <SectionDivider />
        <JustificacionSection />
        <SectionDivider />
        <ProblemaSection />
        <SectionDivider />
        <PreguntaInvestigacionSection />
        <SectionDivider />
        <ObjetivosSection />
        <SectionDivider />
        <CronogramaSection />
        <SectionDivider />
        <TecnologiaSection />
        <SectionDivider />
        <AlcanceSection />
        <SectionDivider />
        <FAQSection />
        <ContactoSection />
      </main>
      <Footer />
    </>
  );
}
