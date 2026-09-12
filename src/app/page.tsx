import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Premise from "@/components/Premise";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Manifesto from "@/components/Manifesto";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Premise />
        <Services />
        <Process />
        <Manifesto />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
