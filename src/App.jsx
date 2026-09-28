import React, { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import LensScale from "./components/layout/LensScale";
import Hero from "./components/hero/Hero";
import "./App.css";

// Lazy-load all below-the-fold sections
const CreatorStyles = lazy(() => import("./components/CreatorStyles/CreatorStyles"));
const EditSuite = lazy(() => import("./components/EditSuite/EditSuite"));
const CaseStudies = lazy(() => import("./components/CaseStudies/CaseStudies"));
const Testimonials = lazy(() => import("./components/testimonials/Testimonials"));
const AboutMe = lazy(() => import("./components/AboutMe/AboutMe"));
const BookingSection = lazy(() => import("./components/booking/BookingSection"));
const Footer = lazy(() => import("./components/layout/Footer"));

function App() {
  return (
    <div className="portfolio-app-root">
      {/* Top Sony FX3 HUD Status Bar */}
      <Navbar />

      {/* Navigation Dock */}
      <LensScale />

      {/* Main Page Content */}
      <main className="app-main-content">
        <Hero />

        {/* Below-the-fold sections load asynchronously without delaying LCP or TBT */}
        <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
          <CreatorStyles />
          <EditSuite />
          <CaseStudies />
          <Testimonials />
          <AboutMe />
          <BookingSection />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;