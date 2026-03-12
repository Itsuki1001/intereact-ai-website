import { useState } from "react";
import emailjs from "@emailjs/browser";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Send, User, Mail, PhoneCall, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
      alert("Contact form is not configured yet. Please try direct contact options.");
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        emailServiceId,
        emailTemplateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        emailPublicKey
      );
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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

          <div className="glass-card gradient-border p-8 sm:p-10 relative overflow-hidden">
            <div className="hero-glow top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]" />

            {submitted ? (
              <div className="relative z-10 py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <Send size={22} className="text-primary" />
                </div>
                <p className="font-display text-2xl font-bold text-foreground">Message Sent!</p>
                <p className="text-muted-foreground text-sm">We'll get back to you shortly.</p>
              </div>
            ) : (
              <div className="relative z-10 space-y-5 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <User size={12} /> Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Mail size={12} /> Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <PhoneCall size={12} /> Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <MessageSquare size={12} /> Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    rows={4}
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                  />
                </div>

                <Button
                  variant="glow"
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Sending..." : <><Send size={16} /> Send Message</>}
                </Button>

                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">or reach us directly</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline-glow" size="default" className="gap-2 flex-1" asChild>
                    <a href={`tel:${siteConfig.contactPhone}`}>
                      <Phone size={15} /> Call Now
                    </a>
                  </Button>
                  <Button variant="outline-glow" size="default" className="gap-2 flex-1" asChild>
                    <a href={siteConfig.contactWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={15} /> WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ContactPage;
