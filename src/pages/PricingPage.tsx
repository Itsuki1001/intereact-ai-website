import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    setup: "₹7,000",
    monthly: "₹2,000",
    messages: "15,000",
    features: [
      "Guest FAQ chatbot",
      "Resort information & policies",
      "Location sharing",
      "Photo sharing",
      "Availability checking",
      "AI powered queries (RAG)",
      "Custom knowledge base",
      "Dedicated server",
    ],
    highlight: false,
  },
  {
    name: "Standard",
    setup: "₹10,000",
    monthly: "₹4,000",
    messages: "25,000",
    features: [
      "Everything in Basic",
      "Human handoff to staff",
      "Room booking flow",
      "Guest itinerary assistance",
      "Google review link after checkout",
      "2 custom automation features",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    setup: "₹12,000",
    monthly: "₹5,000",
    messages: "35,000",
    features: [
      "Everything in Standard",
      "Google Sheets / database auto-update",
      "Manager chatbot for room status",
      "Staff chatbot for operations",
      "Custom reports and alerts",
      "3 additional custom automations",
    ],
    highlight: false,
  },
];

const PricingPage = () => (
  <div className="pt-16">
    <Section>
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs text-primary mb-6">
          Pricing
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Simple, Transparent <span className="gradient-text">Pricing</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose a plan that fits your business. Extra messages charged at ₹1 per message.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl p-[1px] ${plan.highlight ? "bg-gradient-to-b from-primary to-accent" : ""}`}
          >
            <div className={`glass-card h-full p-7 flex flex-col ${plan.highlight ? "bg-card" : ""}`}>
              {plan.highlight && (
                <div className="text-xs font-semibold text-primary mb-3">Most Popular</div>
              )}
              <h3 className="font-display text-2xl font-bold text-foreground">{plan.name}</h3>
              <div className="mt-4 mb-1">
                <span className="font-display text-3xl font-bold text-foreground">{plan.monthly}</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                {plan.setup} one-time setup • {plan.messages} msgs/month
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlight ? "glow" : "outline-glow"} className="w-full" asChild>
                <a href="https://wa.me/919061293580" target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  </div>
);

export default PricingPage;
