import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Use Cases", path: "/use-cases" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
];

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer ring */}
    <circle cx="16" cy="16" r="15" stroke="url(#ringGrad)" strokeWidth="1.5" />
    {/* Neural node center */}
    <circle cx="16" cy="16" r="4" fill="url(#coreGrad)" />
    {/* Orbiting nodes */}
    <circle cx="16" cy="4" r="2.5" fill="url(#nodeGrad)" />
    <circle cx="28" cy="16" r="2.5" fill="url(#nodeGrad)" />
    <circle cx="16" cy="28" r="2.5" fill="url(#nodeGrad)" />
    <circle cx="4" cy="16" r="2.5" fill="url(#nodeGrad)" />
    {/* Connection lines */}
    <line x1="16" y1="12" x2="16" y2="6.5" stroke="url(#lineGrad)" strokeWidth="1" strokeLinecap="round" />
    <line x1="20" y1="16" x2="25.5" y2="16" stroke="url(#lineGrad)" strokeWidth="1" strokeLinecap="round" />
    <line x1="16" y1="20" x2="16" y2="25.5" stroke="url(#lineGrad)" strokeWidth="1" strokeLinecap="round" />
    <line x1="12" y1="16" x2="6.5" y2="16" stroke="url(#lineGrad)" strokeWidth="1" strokeLinecap="round" />
    {/* Diagonal nodes */}
    <circle cx="25" cy="7" r="1.5" fill="#3b82f6" opacity="0.7" />
    <circle cx="25" cy="25" r="1.5" fill="#3b82f6" opacity="0.7" />
    <circle cx="7" cy="25" r="1.5" fill="#3b82f6" opacity="0.7" />
    <circle cx="7" cy="7" r="1.5" fill="#3b82f6" opacity="0.7" />
    <defs>
      <linearGradient id="ringGrad" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </radialGradient>
      <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#93c5fd" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
      </linearGradient>
    </defs>
  </svg>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-lg font-bold text-foreground">
              Interact{" "}
              <span className="text-blue-500">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button variant="glow" size="sm" asChild>
              <a href={siteConfig.contactWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    location.pathname === item.path
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button variant="glow" size="sm" className="w-full" asChild>
                  <a href={siteConfig.contactWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                    Get Started
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
