import { Button } from "@/components/ui/button";
import Section from "@/components/Section";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { useEffect, useState } from "react";

import {
  MessageSquare, Clock, Brain, Image, MapPin, CalendarCheck,
  Zap, Users, ShieldCheck, TrendingUp, BotMessageSquare, Headphones
} from "lucide-react";
import ProblemSection from "@/components/ProblemSection";
/* ─── Equalizer Bar Animation (Vapi-style) ─────────────────────────── */
const WORDS_ROW1 = [
  "Every Message Is an Opportunity",
  "Every Delay Is a Lost Customer",
  "Every Response Drives Revenue"
];

const WORDS_ROW2 = [
  "Respond Faster",
  "Convert Better",
  "Retain Longer",
  "Grow Smarter"
];

function MarqueeRow({
  words,
  sep = "✦",
  reverse = false,
  duration = 28,
}: {
  words: string[];
  sep?: string;
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...words, ...words];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <motion.div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "max-content", // ← key fix: makes % translate work correctly
        }}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((word, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', 'Cormorant', Georgia, serif",
                fontSize: "clamp(26px, 3.8vw, 52px)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? "#ede9e1" : "rgba(237,233,225,0.22)",
                padding: "0 20px",
                fontWeight: 300, // ← thin weight matches the image
              }}
            >
              {word}
            </span>
            <span
              style={{
                color: "rgba(237,233,225,0.2)",
                fontSize: "10px",
                letterSpacing: 0,
              }}
            >
              {sep}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────── */
const problems = [
  "Too many repetitive customer questions",
  "Staff wasting hours replying to WhatsApp messages",
  "Slow response times losing bookings",
  "Guests waiting for simple information",
  "Missed inquiries during off-hours",
];

const features = [
  { icon: Clock, title: "Instant 24/7 Responses", desc: "Never miss a guest inquiry, day or night." },
  { icon: Brain, title: "Natural Language Understanding", desc: "AI that truly understands guest questions." },
  { icon: Image, title: "Share Photos & Media", desc: "Send room images, documents, and more." },
  { icon: MapPin, title: "Location Sharing", desc: "Share Google Maps location instantly." },
  { icon: CalendarCheck, title: "Booking Assistance", desc: "Handle availability checks and reservations." },
  { icon: MessageSquare, title: "Works on WhatsApp", desc: "No app downloads — guests use WhatsApp." },
];

const benefits = [
  { icon: Zap, title: "Reduce Workload", desc: "Automate 80% of repetitive conversations." },
  { icon: TrendingUp, title: "Capture More Bookings", desc: "Instant replies convert more inquiries." },
  { icon: Headphones, title: "Better Guest Experience", desc: "Guests get answers in seconds." },
  { icon: Users, title: "24/7 Operations", desc: "Your AI never sleeps or takes breaks." },
  { icon: BotMessageSquare, title: "Smart Automation", desc: "AI learns your business knowledge." },
  { icon: ShieldCheck, title: "Reliable & Accurate", desc: "Answers from your verified knowledge base." },
];

/* ─── Page ──────────────────────────────────────────────────────────── */
const HomePage = () => (
  <div className="pt-16">

    {/* ── Hero ─────────────────────────────────────────────────────── */}
<section
  className="relative overflow-hidden flex flex-col items-center justify-start text-center pt-16 sm:pt-20 min-h-[78vh] sm:min-h-[85vh] lg:min-h-[92vh]"
  style={{
  
    backgroundColor: "#0a0a0a",
    backgroundImage: `
      radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)
    `,
    backgroundSize: "45px 45px",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 pointer-events-none" />

  {/* CONTENT */}
  <div
    className="relative z-10 flex flex-col items-center px-6 pb-[120px]"
    
  >
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
        lineHeight: 1.1,
        color: "#ffffff",
        letterSpacing: "-0.02em",
        maxWidth: 760,
        marginBottom: "2.5rem",
      }}
    >
      Automate Your Business<br />with AI
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.18 }}
      className="flex flex-wrap justify-center gap-4"
    >
      <a
        href={siteConfig.contactWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          paddingInline: "2rem",
          paddingBlock: "0.85rem",
          borderRadius: 9999,
          background: "#4ade80",
          color: "#0a0a0a",
          fontWeight: 600,
          fontSize: "0.85rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Get Started <span style={{ fontSize: "0.75rem" }}>›</span>
      </a>

      <a
        href={`tel:${siteConfig.contactPhone}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          paddingInline: "2rem",
          paddingBlock: "0.85rem",
          borderRadius: 9999,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#ffffff",
          fontWeight: 500,
          fontSize: "0.85rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Contact Us
      </a>
    </motion.div>
  </div>

{/* Marquee — absolute bottom */}
<div className="absolute bottom-0 left-0 right-0 flex flex-col pb-2 pointer-events-none" style={{ gap: '1px' }}>  <MarqueeRow words={WORDS_ROW1} sep="✦" duration={28} />
  <MarqueeRow words={WORDS_ROW2} sep="✦" reverse duration={36} />
</div>
</section>
    {/* ── Problem ──────────────────────────────────────────────────── */}
    <ProblemSection />

    {/* ── Solution ─────────────────────────────────────────────────── */}
    <Section>
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Your <span className="gradient-text">24/7 AI Front Desk</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          An AI assistant on WhatsApp that handles guest conversations automatically.
          No app downloads, no complicated setup.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card-hover p-6"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <f.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>

    {/* ── Why Interact AI ──────────────────────────────────────────── */}
    <Section>
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Why <span className="gradient-text">Interact AI</span>?
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card-hover p-6"
          >
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <b.icon size={20} className="text-accent" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{b.title}</h3>
            <p className="text-sm text-muted-foreground">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>

    {/* ── CTA ──────────────────────────────────────────────────────── */}
    <Section>
      <div className="glass-card gradient-border p-10 sm:p-14 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Join businesses that are saving hours every day with AI-powered WhatsApp automation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="glow" size="lg" asChild>
              <a href={siteConfig.contactWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                Get Started on WhatsApp
              </a>
            </Button>
            <Button variant="outline-glow" size="lg" asChild>
              <a href={`tel:${siteConfig.contactPhone}`}>Call Us</a>
            </Button>
          </div>
        </div>
      </div>
    </Section>

  </div>
);

export default HomePage;