import React, { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import LensScale from "./components/layout/LensScale";
import Hero from "./components/hero/Hero";
import "./App.css";

// Lazy-loaded chunked components (preserves fast initial bundle)
const CreatorStyles = lazy(() => import("./components/CreatorStyles/CreatorStyles"));
const EditSuite = lazy(() => import("./components/EditSuite/EditSuite"));
const CaseStudies = lazy(() => import("./components/CaseStudies/CaseStudies"));
const Testimonials = lazy(() => import("./components/testimonials/Testimonials"));
const AboutMe = lazy(() => import("./components/AboutMe/AboutMe"));
const BookingSection = lazy(() => import("./components/booking/BookingSection"));
const Footer = lazy(() => import("./components/layout/Footer"));

export default function App() {
  return (
    <div className="portfolio-app-root">
      {/* HUD Telemetry Header */}
      <Navbar />

      {/* Track Rail Navigation */}
      <LensScale />

      {/* Main Page Content */}
      <main className="app-main-content">
        {/* Critical Render Path: Hero loads synchronously */}
        <Hero />

        {/* Below-the-fold components wrapped cleanly in standard Suspense */}
        <Suspense fallback={<div className="sections-fallback" style={{ minHeight: "50vh" }} />}>
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