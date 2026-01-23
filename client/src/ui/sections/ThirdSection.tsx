import { Briefcase, Zap, Globe, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ThirdSection() {
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class when in view
            entry.target.classList.add(entry.target === leftTextRef.current ? "text-from-left-to-right" : "text-from-right-to-left");
            // Optional: remove initial hidden state
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Slight early trigger
      }
    );

    if (leftTextRef.current) {
      leftTextRef.current.classList.add("opacity-0"); // Start hidden
      observer.observe(leftTextRef.current);
    }
    if (rightTextRef.current) {
      rightTextRef.current.classList.add("opacity-0"); // Start hidden
      observer.observe(rightTextRef.current);
    }

    return () => {
      if (leftTextRef.current) observer.unobserve(leftTextRef.current);
      if (rightTextRef.current) observer.unobserve(rightTextRef.current);
    };
  }, []);

  return (
    <section className="relative py-32 px-8 bg-linear-50">
      {/* <div className="absolute top-0 -translate-y-1/2 right-0 translate-x-60 size-96 rounded-full blur-3xl opacity-20 dark:opacity-10 bg-amber-300 z-10" /> */}
      <div className="absolute top-10 right-70 translate-x-60 size-96 rounded-full blur-3xl opacity-20 dark:opacity-10 bg-amber-300" />

      <div className="max-w-7xl mx-auto">
        {/* First Row */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-neutral-950 dark:text-white">Your Talent is Currency</h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Why wait for clients to find you? Mark your elite assets as{" "}
              <span className="text-neutral-950 dark:text-white font-medium">Premium</span> and generate passive revenue while you sleep. Our secure
              licensing engine handles the boring stuff so you can focus on creating.
            </p>

            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <ShieldCheck className="size-4 text-accent-foreground" /> Secure Payments
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <Globe className="size-4 text-accent-foreground" /> Global Reach
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-video bg-neutral-200/50 dark:bg-secondary/30 rounded-3xl border border-neutral-300/50 dark:border-white/10 flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('/networking.avif')] bg-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="z-10 bg-white/80 dark:bg-background/80 backdrop-blur-md p-8 rounded-2xl border border-neutral-200 dark:border-white/10 shadow-2xl">
              <Zap className="size-12 text-amber-500 dark:text-amber-400 mb-4" />
              <p className="text-2xl font-bold italic text-neutral-950 dark:text-white">$2,450.00</p>
              <p className="text-xs text-neutral-500 uppercase tracking-widest">Monthly Creator Earnings</p>
            </div>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-2 lg:order-1 aspect-video bg-neutral-200/50 dark:bg-secondary/30 rounded-3xl border border-neutral-300/50 dark:border-white/10 flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('/monetizing.avif')] bg-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="z-10 flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="size-16 rounded-full border-4 border-background bg-neutral-900 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs uppercase text-white"
                >
                  Brand {i}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 space-y-6"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-neutral-950 dark:text-white">Bridge to Industry</h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We bridge the gap between creative vision and corporate need. Vespera's brand portal allows Fortune 500 companies to scout talent
              directly. Build a portfolio that doesn't just look pretty—it gets hired.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <Briefcase className="size-4 text-accent-foreground" /> Direct Contracts
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
