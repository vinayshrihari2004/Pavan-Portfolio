import React from "react";
import Navbar from "./components/layout/Navbar";
import LensScale from "./components/layout/LensScale";
import Hero from "./components/hero/Hero";
import CreatorStyles from "./components/CreatorStyles/CreatorStyles";
import EditSuite from "./components/EditSuite/EditSuite";
import CaseStudies from "./components/CaseStudies/CaseStudies";
import Testimonials from "./components/testimonials/Testimonials";
import AboutMe from "./components/AboutMe/AboutMe";
import BookingSection from "./components/booking/BookingSection";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <div className="portfolio-app-root">
      {/* HUD Telemetry Header */}
      <Navbar />

      {/* Track Rail Navigation */}
      <LensScale />

      {/* Main Page Content */}
      <main className="app-main-content">
        <Hero />
        <CreatorStyles />
        <EditSuite />
        <CaseStudies />
        <Testimonials />
        <AboutMe />
        <BookingSection />
        <Footer />
      </main>
    </div>
  );
}