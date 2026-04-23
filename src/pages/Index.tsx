import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Cities from "@/components/site/Cities";
import FeaturedStylists from "@/components/site/FeaturedStylists";
import HowItWorks from "@/components/site/HowItWorks";
import StylistCTA from "@/components/site/StylistCTA";
import Testimonials from "@/components/site/Testimonials";
import Footer from "@/components/site/Footer";
import CookieConsent from "@/components/site/CookieConsent";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Cities />
        <FeaturedStylists />
        <HowItWorks />
        <StylistCTA />
        <Testimonials />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
