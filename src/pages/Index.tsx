import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UserTypes from "@/components/UserTypes";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <UserTypes />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
