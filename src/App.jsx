import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import LensScale from "./components/layout/LensScale";
import Hero from "./components/hero/Hero";
import "./App.css";

// Lazy-loaded chunked components
const CreatorStyles = lazy(() => import("./components/CreatorStyles/CreatorStyles"));
const EditSuite = lazy(() => import("./components/EditSuite/EditSuite"));
const CaseStudies = lazy(() => import("./components/CaseStudies/CaseStudies"));
const Testimonials = lazy(() => import("./components/testimonials/Testimonials"));
const AboutMe = lazy(() => import("./components/AboutMe/AboutMe"));
const BookingSection = lazy(() => import("./components/booking/BookingSection"));
const Footer = lazy(() => import("./components/layout/Footer"));

// Viewport-aware loader that halts downloading chunks until scrolled near
function LazySection({ children, minHeight = "400px" }) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} style={{ minHeight: inView ? "auto" : minHeight }}>
      {inView ? children : null}
    </div>
  );
}

export default function App() {
  return (
    <div className="portfolio-app-root">
      {/* HUD Telemetry Header */}
      <Navbar />

      {/* Track Rail Navigation */}
      <LensScale />

      {/* Main Page Content */}
      <main className="app-main-content">
        {/* Critical Render Path: Hero is loaded immediately */}
        <Hero />

        {/* Below-the-fold modules load on-demand without blocking TBT */}
        <Suspense fallback={<div style={{ minHeight: "300px" }} />}>
          <LazySection minHeight="500px">
            <CreatorStyles />
          </LazySection>

          <LazySection minHeight="600px">
            <EditSuite />
          </LazySection>

          <LazySection minHeight="600px">
            <CaseStudies />
          </LazySection>

          <LazySection minHeight="500px">
            <Testimonials />
          </LazySection>

          <LazySection minHeight="500px">
            <AboutMe />
          </LazySection>

          <LazySection minHeight="400px">
            <BookingSection />
          </LazySection>

          <LazySection minHeight="200px">
            <Footer />
          </LazySection>
        </Suspense>
      </main>
    </div>
  );
}