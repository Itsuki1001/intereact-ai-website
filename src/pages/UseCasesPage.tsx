import Section from "@/components/Section";
import { motion } from "framer-motion";
import {
  BedDouble, Camera, MapPin, CalendarCheck, Plane, Mountain,
  ClipboardList, Headphones, Users, Star, FileText, Search
} from "lucide-react";

const useCases = [
  { icon: BedDouble, title: "Room Information", desc: "Answer questions about room types, amenities, kitchen, policies, and parking availability." },
  { icon: Camera, title: "Photo Sharing", desc: "Automatically send room photos and property images to interested guests." },
  { icon: MapPin, title: "Location Sharing", desc: "Share Google Maps location of your property instantly." },
  { icon: CalendarCheck, title: "Booking Assistance", desc: "Check room availability, ask number of guests, provide booking links, and update booking details." },
  { icon: Plane, title: "Travel Information", desc: "Answer distance from airport, travel time from nearby cities, and transport options." },
  { icon: Mountain, title: "Tourism & Itinerary", desc: "Recommend nearby attractions and create personalized travel itineraries for guests." },
  { icon: ClipboardList, title: "House Rules & Policies", desc: "Answer questions about check-in/check-out, ID requirements, and property rules." },
  { icon: Headphones, title: "In-Stay Guest Support", desc: "Handle requests like extra towels, room cleaning, and staff assistance." },
  { icon: Users, title: "Staff Communication", desc: "Relay guest questions to staff and return answers seamlessly." },
  { icon: Star, title: "Post-Stay Automation", desc: "Automatically send review requests after checkout." },
  { icon: FileText, title: "Invoice & Documents", desc: "Send invoices and documents directly via WhatsApp." },
  { icon: Search, title: "Lost & Found", desc: "Help guests report and track lost items easily." },
];

const UseCasesPage = () => (
  <div className="pt-16">
    <Section>
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs text-primary mb-6">
          Use Cases
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
          What the AI Assistant <span className="gradient-text">Can Do</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          From answering FAQs to handling bookings, your AI assistant automates every aspect of guest communication.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {useCases.map((uc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card-hover p-6"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <uc.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{uc.title}</h3>
            <p className="text-sm text-muted-foreground">{uc.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  </div>
);

export default UseCasesPage;
