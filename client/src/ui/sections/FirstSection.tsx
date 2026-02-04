import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FirstSection() {
  const firstSection = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: firstSection,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={firstSection} className="relative h-screen flex flex-col items-center justify-center min-h-[90vh] overflow-hidden px-4">
      <motion.div style={{ opacity }} className="z-10 text-center space-y-6 relative">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-500 relative z-20">
          VESPERA
        </h1>

        {/* MIRROR REFLECTION */}
        <div className="relative -mt-6 md:-mt-10 pointer-events-none select-none">
          <h1
            className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent scale-y-[-1] blur-[2px] opacity-40
            bg-linear-to-b from-neutral-950/30 to-transparent 
            dark:from-white/20 dark:to-transparent"
          >
            VESPERA
          </h1>

          {/* FADE OVERLAY: Matches the current theme background */}
          <div
            className="absolute inset-0 h-full w-full 
            bg-linear-to-t from-background via-background/10 to-transparent"
          />
        </div>

        <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed pt-8">
          The premiere stage for digital visionaries. Showcase your craft, connect with global brands, and turn your aesthetic into your equity.
        </p>
      </motion.div>

      {/* DYNAMIC FLOOR GLOW */}
      <div
        className="absolute bottom-0 w-full h-[20%] pointer-events-none
        bg-linear-to-t from-neutral-200/50 to-transparent 
        dark:from-white/5 dark:to-transparent"
      />
    </section>
  );
}
