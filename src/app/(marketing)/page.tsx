import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Premise from "@/components/Premise";
import Services from "@/components/Services";
import Formats from "@/components/Formats";
import Process from "@/components/Process";
import Manifesto from "@/components/Manifesto";
import WhyUs from "@/components/WhyUs";
import Pricing from "@/components/Pricing";
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
        <Formats />
        <Process />
        <Manifesto />
        <WhyUs />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
