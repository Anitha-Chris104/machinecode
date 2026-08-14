import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroCarousel from "./HeroCarousel";
import HeroStats from "./HeroStats";
import TrustBadges from "./TrustBadges";
import TrustedCompanies from "./TrustedCompanies";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  ArrowRightIcon,
  FactorySilhouette,
  GearOutline,
  LogoMark,
  MouseIcon,
  ShieldIcon,
} from "./icons";

const navItems = [
  { name: "Home", type: "page", path: "/" },

  // { name: "Solutions", type: "section", path: "/#products" },
  { name: "Products", type: "page", path: "/products" },
  { name: "Industries", type: "section", path: "/#industries" },
  // { name: "Projects", type: "section", path: "/#projects" },
  { name: "About Us", type: "section", path: "/#about" },
  { name: "Contact Us", type: "page", path: "/contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id="home" className="min-h-screen bg-[#0D244D] text-white">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
          isScrolled
            ? "border-white/10 bg-[#061832]/92 shadow-2xl backdrop-blur-xl"
            : "border-white/10 bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-[74px] max-w-[1480px] items-center justify-between px-5 sm:px-8 xl:px-16"
          aria-label="Primary navigation"
        >
          <a
            href="#home"
            className="flex items-center gap-3"
            aria-label="Machinecode home"
          >
            <LogoMark />
            <span className="text-lg font-black uppercase tracking-[0.08em] text-white sm:text-xl">
              MACHINECODE
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) =>
              item.type === "page" ? (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative py-7 text-sm font-semibold transition hover:text-[#C2441C] ${
                      isActive ? "text-[#ffb199]" : "text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ) : (
                <HashLink
                  key={item.name}
                  smooth
                  to={item.path}
                  className="relative py-7 text-sm font-semibold text-white transition hover:text-[#C2441C]"
                >
                  {item.name}
                </HashLink>
              ),
            )}
          </div>

          <NavLink
            to="/contact"
            className="rounded-md bg-[#C2441C] px-4 py-3 text-sm font-black text-white shadow-[0_15px_35px_rgba(194,68,28,0.28)] transition hover:-translate-y-0.5 hover:bg-[#AA542B] focus:outline-none focus:ring-2 focus:ring-white sm:px-6"
          >
            Get a Quote
          </NavLink>
        </nav>
      </header>

      <section className="relative isolate min-h-screen overflow-hidden bg-[#061832] pt-[74px]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,36,77,0.98),rgba(13,36,77,0.9)_46%,rgba(133,46,71,0.78)),radial-gradient(circle_at_82%_22%,rgba(194,68,28,0.32),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(0,95,150,0.22),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
        <div
          className="absolute left-0 top-24 h-[72%] w-full opacity-50"
          aria-hidden="true"
        >
          <FactorySilhouette />
        </div>
        <GearOutline className="absolute -right-16 bottom-20 h-48 w-48 text-[#C2441C]/20 sm:h-64 sm:w-64" />
        <GearOutline className="absolute -left-20 top-20 h-56 w-56 text-white/8" />
        <motion.div
          animate={{ y: [0, 26, 0], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[12%] top-28 h-52 w-52 rounded-full bg-[#C2441C]/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-[1480px] gap-10 px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center xl:px-16">
          <div className="order-2 min-w-0 lg:order-1">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-[#061832]/38 px-4 py-3 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-md sm:text-xs"
              >
                <ShieldIcon className="h-4 w-4" />
                Trusted Industrial Manufacturing Partner
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-7 text-2xl font-black leading-[1.02] tracking-[-0.02em] text-white drop-shadow-2xl sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                <span className="block">Building the</span>
                <span className="block">Machines Behind</span>
                <span className="block text-[#C2441C]">Progress</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/88 sm:text-xl lg:mx-0"
              >
                Innovative Industrial Solutions for Factories, Food Processing,
                Hotels, and Institutions.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
              >
                <a
                  href="#about-us"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-md bg-[#C2441C] px-7 py-4 text-base font-black text-white shadow-[0_16px_38px_rgba(194,68,28,0.3)] transition hover:-translate-y-0.5 hover:bg-[#AA542B] focus:outline-none focus:ring-2 focus:ring-white sm:w-auto"
                >
                  Explore Us
                  <ArrowRightIcon className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#products"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-md border border-white/70 bg-[#061832]/25 px-7 py-4 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0D244D] focus:outline-none focus:ring-2 focus:ring-white sm:w-auto"
                >
                  Explore Products
                  <ArrowRightIcon className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-9">
                <TrustBadges />
              </motion.div>
            </motion.div>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <HeroCarousel />
          </div>
        </div>

        <HeroStats />
      </section>

      <TrustedCompanies />

      <section id="contact" className="bg-slate-50 pb-8 text-slate-900">
        <motion.a
          href="#about-us"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mx-auto flex w-fit items-center gap-3 text-sm text-slate-700 transition hover:text-[#C2441C]"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <MouseIcon />
          </motion.span>
          Scroll to Discover
        </motion.a>
      </section>
    </main>
  );
}

export default Hero;
