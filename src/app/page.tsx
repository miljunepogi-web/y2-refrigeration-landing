import dynamic from "next/dynamic";
import { Areas } from "@/components/Areas";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { JsonLd } from "@/components/JsonLd";

const FAQ = dynamic(() => import("@/components/FAQ").then((module) => module.FAQ));
const ContactForm = dynamic(() =>
  import("@/components/ContactForm").then((module) => module.ContactForm),
);

export default function Home() {
  return (
    <>
      <JsonLd />
      <div className="relative overflow-x-clip pb-24 sm:pb-0">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-35" />
        <Navbar />
        <main>
          <Hero />
          <Services />
          <WhyChooseUs />
          <Gallery />
          <Pricing />
          <Areas />
          <Testimonials />
          <FAQ />
          <ContactForm />
        </main>
        <Footer />
        <FloatingContactButtons />
      </div>
    </>
  );
}
