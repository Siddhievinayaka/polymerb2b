import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">
      <Header />
      <Hero />
      <WhyUs />
      <Categories />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}