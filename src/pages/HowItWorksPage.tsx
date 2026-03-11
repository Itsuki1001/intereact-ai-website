import Section from "@/components/Section";
import { motion } from "framer-motion";
import { Database, Bot, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Database,
    step: "01",
    title: "Connect Your Business Data",
    desc: "Share your rooms, services, policies, and FAQs. We build a custom knowledge base tailored to your property.",
  },
  {
    icon: Bot,
    step: "02",
    title: "Build Your AI Assistant",
    desc: "We configure AI workflows, automation tools, and integrations specific to your business needs.",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Deploy on WhatsApp",
    desc: "Your AI assistant goes live and starts handling guest conversations automatically — 24/7.",
  },
];

const HowItWorksPage = () => (
  <div className="pt-16">
    <Section>
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs text-primary mb-6">
          How It Works
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Get Started in <span className="gradient-text">3 Simple Steps</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          From setup to going live, we handle everything so you can focus on your business.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card-hover p-8 flex flex-col sm:flex-row items-start gap-6"
          >
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                <s.icon size={28} className="text-primary" />
                <span className="absolute -top-2 -right-2 text-[10px] font-bold text-accent bg-background border border-border rounded-full h-6 w-6 flex items-center justify-center">
                  {s.step}
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  </div>
);

export default HowItWorksPage;
