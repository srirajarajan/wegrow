import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { Intro } from "./components/Brand";
import Nav from "./components/Nav";
import { bindAnchorClicks, initSmoothScroll } from "./lib/scroll";
import Hero from "./sections/Hero";
import Trust from "./sections/Trust";
import About from "./sections/About";
import Services from "./sections/Services";
import Projects from "./sections/Projects";
import Process from "./sections/Process";
import Why from "./sections/Why";
import { Pricing, Testimonials } from "./sections/Pricing";
import { Contact } from "./sections/Contact";
import Footer from "./sections/Footer";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-iris via-lime to-lime-soft"
    />
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stopScroll = initSmoothScroll();
    const unbind = bindAnchorClicks();
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => {
      stopScroll();
      unbind();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Intro onDone={() => setReady(true)} />
      <ScrollProgress />
      <Nav ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <Trust />
        <About />
        <Services />
        <Projects />
        <Process />
        <Why />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
