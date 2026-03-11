import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

const ContactPage = () => (
  <div className="pt-16">
    <Section>
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs text-primary mb-6">
          Contact
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Let's <span className="gradient-text">Talk</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto mb-10">
          Interested in automating your business with AI? Contact us and we will help you get started.
        </p>

        <div className="glass-card gradient-border p-10 space-y-8 relative overflow-hidden">
          <div className="hero-glow top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]" />
          <div className="relative z-10 space-y-6">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Phone</p>
              <a href="tel:+919061293580" className="font-display text-2xl font-bold text-foreground hover:text-primary transition-colors">
                +91 90612 93580
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="glow" size="lg" className="gap-2" asChild>
                <a href="tel:+919061293580">
                  <Phone size={18} /> Call Now
                </a>
              </Button>
              <Button variant="outline-glow" size="lg" className="gap-2" asChild>
                <a href="https://wa.me/919061293580" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

export default ContactPage;
