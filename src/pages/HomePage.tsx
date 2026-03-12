import { Button } from "@/components/ui/button";
import Section from "@/components/Section";
import ChatDemo from "@/components/ChatDemo";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import {
  MessageSquare, Clock, Brain, Image, MapPin, CalendarCheck,
  Zap, Users, ShieldCheck, TrendingUp, BotMessageSquare, Headphones
} from "lucide-react";

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

const HomePage = () => (
  <div className="pt-16">
    {/* Hero */}
    <section className="relative overflow-hidden section-padding min-h-[90vh] flex items-center">
      <div className="hero-glow top-1/4 left-1/4 -translate-x-1/2" />
      <div className="hero-glow top-1/3 right-0 translate-x-1/4" style={{ background: "radial-gradient(circle, hsl(265 80% 60% / 0.1), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs text-primary mb-6">
              <Zap size={14} /> AI Automation for Modern Businesses
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
              Automate Your Business Conversations{" "}
              <span className="gradient-text">with AI</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              Interact AI provides intelligent WhatsApp assistants that automate customer interactions, bookings, and guest support for modern businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="glow" size="lg" asChild>
                <a href={siteConfig.contactWhatsAppUrl} target="_blank" rel="noopener noreferrer">Get Started</a>
              </Button>
              <Button variant="outline-glow" size="lg" asChild>
                <a href={`tel:${siteConfig.contactPhone}`}>Contact Us</a>
              </Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <ChatDemo />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Problem */}
    <Section>
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
          The Problem with <span className="gradient-text">Manual Support</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Your staff shouldn't be answering the same questions hundreds of times.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 flex items-start gap-3"
          >
            <div className="mt-1 h-2 w-2 rounded-full bg-destructive flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{p}</p>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="glass-card gradient-border p-5 flex items-start gap-3"
        >
          <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
          <p className="text-sm text-foreground font-medium">Interact AI solves all of this — automatically.</p>
        </motion.div>
      </div>
    </Section>

    {/* Solution */}
    <Section>
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Your <span className="gradient-text">24/7 AI Front Desk</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          An AI assistant on WhatsApp that handles guest conversations automatically. No app downloads, no complicated setup.
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

    {/* Why Interact AI */}
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

    {/* CTA */}
    <Section>
      <div className="glass-card gradient-border p-10 sm:p-14 text-center relative overflow-hidden">
        <div className="hero-glow top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]" />
        <div className="relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Join businesses that are saving hours every day with AI-powered WhatsApp automation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="glow" size="lg" asChild>
              <a href={siteConfig.contactWhatsAppUrl} target="_blank" rel="noopener noreferrer">Get Started on WhatsApp</a>
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
