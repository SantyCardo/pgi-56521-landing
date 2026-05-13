import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import HeroTechnical from "@/components/HeroTechnical";

const ProyectoSection = dynamic(() => import("@/components/ProyectoSection"));
const SectionDivider = dynamic(() => import("@/components/SectionDivider"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const ProblemaSection = dynamic(() => import("@/components/ProblemaSection"));
const ObjetivosSection = dynamic(() => import("@/components/ObjetivosSection"));
const TecnologiaSection = dynamic(() => import("@/components/TecnologiaSection"));
const MetodologiaSection = dynamic(() => import("@/components/MetodologiaSection"));
const JustificacionSection = dynamic(() => import("@/components/JustificacionSection"));
const ArbolProblemaSection = dynamic(() => import("@/components/ArbolProblemaSection"));
const PreguntaInvestigacionSection = dynamic(() => import("@/components/PreguntaInvestigacionSection"));
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
        <HowItWorks />
        <SectionDivider />
        <ProblemaSection />
        <SectionDivider />
        <ArbolProblemaSection />
        <SectionDivider />
        <PreguntaInvestigacionSection />
        <SectionDivider />
        <ObjetivosSection />
        <SectionDivider />
        <TecnologiaSection />
        <SectionDivider />
        <MetodologiaSection />
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
