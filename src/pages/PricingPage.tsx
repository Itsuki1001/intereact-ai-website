import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

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

const PricingPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isActive = (i: number) =>
    hoveredIndex !== null ? hoveredIndex === i : plans[i].highlight;

  return (
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

        <div className="max-w-5xl mx-auto">
          {/* Banner row */}
          <div className="grid md:grid-cols-3 gap-6 mb-3">
            {plans.map((plan, i) => (
              <div key={i} className="flex justify-center items-center h-8">
                {plan.highlight && (
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    <Star size={11} className="fill-current" />
                    Most Popular
                    <Star size={11} className="fill-current" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cards row */}
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => {
              const active = isActive(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  animate={{ y: active ? -12 : 0, scale: active ? 1.03 : 1 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`rounded-xl p-[1px] cursor-pointer transition-all duration-300 flex flex-col ${
                    active
                      ? "bg-gradient-to-b from-primary to-accent shadow-2xl shadow-primary/30"
                      : ""
                  }`}
                >
                  <div className="glass-card flex flex-col flex-1 p-7 rounded-xl">
                    <h3 className="font-display text-2xl font-bold text-foreground">{plan.name}</h3>

                    {/* Price block — both monthly and setup highlighted equally */}
                    <div className="mt-4 mb-6 grid grid-cols-2 gap-3 border border-border/50 rounded-lg p-3 bg-background/40">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-0.5">Setup Fee</span>
                        <span className={`font-display text-2xl font-bold leading-none transition-colors duration-300 ${active ? "text-primary" : "text-foreground"}`}>
                          {plan.setup} 
                        </span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">one-time</span>
                      </div>
                      <div className={`flex flex-col border-l pl-3 transition-colors duration-300 ${active ? "border-primary/40" : "border-border/50"}`}>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-0.5">Monthly</span>
                        <span className={`font-display text-2xl font-bold leading-none transition-colors duration-300 ${active ? "text-primary" : "text-foreground"}`}>
                          {plan.monthly}
                        </span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">/month</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground -mt-3 mb-6">
                      {plan.messages} messages/month included
                    </p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check
                            size={16}
                            className={`flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                              active ? "text-primary" : "text-muted-foreground"
                            }`}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={active ? "glow" : "outline-glow"}
                      className="w-full transition-all duration-300"
                      asChild
                    >
                      <a href={siteConfig.contactWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                        Get Started
                      </a>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PricingPage;
