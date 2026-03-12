import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/site-config";

const FooterLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" stroke="url(#fRingGrad)" strokeWidth="1.5" />
    <circle cx="16" cy="16" r="4" fill="url(#fCoreGrad)" />
    <circle cx="16" cy="4" r="2.5" fill="url(#fNodeGrad)" />
    <circle cx="28" cy="16" r="2.5" fill="url(#fNodeGrad)" />
    <circle cx="16" cy="28" r="2.5" fill="url(#fNodeGrad)" />
    <circle cx="4" cy="16" r="2.5" fill="url(#fNodeGrad)" />
    <line x1="16" y1="12" x2="16" y2="6.5" stroke="url(#fLineGrad)" strokeWidth="1" strokeLinecap="round" />
    <line x1="20" y1="16" x2="25.5" y2="16" stroke="url(#fLineGrad)" strokeWidth="1" strokeLinecap="round" />
    <line x1="16" y1="20" x2="16" y2="25.5" stroke="url(#fLineGrad)" strokeWidth="1" strokeLinecap="round" />
    <line x1="12" y1="16" x2="6.5" y2="16" stroke="url(#fLineGrad)" strokeWidth="1" strokeLinecap="round" />
    <circle cx="25" cy="7" r="1.5" fill="#3b82f6" opacity="0.7" />
    <circle cx="25" cy="25" r="1.5" fill="#3b82f6" opacity="0.7" />
    <circle cx="7" cy="25" r="1.5" fill="#3b82f6" opacity="0.7" />
    <circle cx="7" cy="7" r="1.5" fill="#3b82f6" opacity="0.7" />
    <defs>
      <linearGradient id="fRingGrad" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <radialGradient id="fCoreGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </radialGradient>
      <linearGradient id="fNodeGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#93c5fd" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="fLineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
      </linearGradient>
    </defs>
  </svg>
);

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <FooterLogo />
            <span className="font-display text-lg font-bold text-foreground">
              Interact <span className="text-blue-500">AI</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm">
            AI Automation for Modern Businesses. Intelligent WhatsApp assistants that handle customer conversations automatically.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3 text-sm">Pages</h4>
          <div className="space-y-2">
            {["Home", "Use Cases", "How It Works", "Pricing", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/ /g, "-")}`}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3 text-sm">Contact</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href={`tel:${siteConfig.contactPhone}`} className="block hover:text-foreground transition-colors">{siteConfig.contactPhone}</a>
            <a href={siteConfig.contactWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Interact <span className="text-blue-500">AI</span>. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
