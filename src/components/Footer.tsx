import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">IA</span>
            </div>
            <span className="font-display text-lg font-bold text-foreground">Interact AI</span>
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
            <a href="tel:+919061293580" className="block hover:text-foreground transition-colors">+91 90612 93580</a>
            <a href="https://wa.me/919061293580" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Interact AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
