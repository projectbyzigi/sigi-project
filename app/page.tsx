import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ScrollSequenceCanvas from "@/components/ScrollSequenceCanvas";
import Services from "@/components/Services";
import ProjectsGallery from "@/components/ProjectsGallery";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* 2 — Hero: finished villa */}
        <Hero />

        {/* 3 — Scrollytelling: villa deconstructed back to the first sketch */}
        <ScrollSequenceCanvas />

        {/* 4 — Leistungen */}
        <Services />

        {/* 5 — Projekte / Realisierte Arbeiten */}
        <ProjectsGallery />

        {/* 6 — Ablauf */}
        <Process />

        {/* 7 — Über uns */}
        <About />

        {/* 8 — Kontakt / Impressum */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
