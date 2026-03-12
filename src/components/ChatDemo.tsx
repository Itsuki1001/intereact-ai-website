import { motion } from "framer-motion";

interface ChatMessage {
  from: "guest" | "ai";
  text: string;
}

const conversations: ChatMessage[] = [
  { from: "guest", text: "Hi, what rooms do you have available?" },
  { from: "ai", text: "We currently offer Deluxe Rooms, Premium Suites, and Pool Villas. All include AC, Wi-Fi, and breakfast." },
  { from: "guest", text: "Can you show me some room photos?" },
  { from: "ai", text: "📸 Here are some photos of our rooms! [Images Attached]\n\nWould you like to check availability?" },
  { from: "guest", text: "Yes, can I book for tomorrow?" },
  { from: "ai", text: "Let me check availability… ✅ Deluxe Rooms are available. How many guests will be staying?" },
  { from: "guest", text: "2 guests" },
  { from: "ai", text: "Great! Your stay is available. Tap below to confirm your booking." },
  { from: "ai", text: "🔗 Book Now" },
  { from: "guest", text: "Where is the resort located?" },
  { from: "ai", text: "📍 We're located near the main tourist area with easy access from the airport.\n\nI've shared the Google Maps location below." },
  { from: "ai", text: "📍 Location Shared (Google Maps)" },
  { from: "guest", text: "What activities can we do nearby?" },
  { from: "ai", text: "Here's a quick itinerary for your stay:\n\n🌅 Morning: Relax at the resort garden\n🏖 Afternoon: Visit nearby beaches\n🌇 Evening: Explore the waterfront promenade\n🍽 Dinner: Try popular local restaurants nearby" },
  { from: "guest", text: "Can I get extra towels in the room?" },
  { from: "ai", text: "Sure! Let me check with the staff and arrange that for you." },
  { from: "ai", text: "✅ Housekeeping has been notified. Extra towels will be delivered shortly." },
  { from: "ai", text: "Hope you enjoyed your stay! If you'd like, I can send your invoice." },
  { from: "guest", text: "Yes please send it." },
  { from: "ai", text: "📄 Invoice sent." },
  { from: "ai", text: "⭐ We'd love your feedback! Please leave us a Google review." },
  { from: "ai", text: "🔗 Leave a Google Review" }
];

// Travel-themed tile pattern rendered as inline SVG
const PatternTile = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="130"
    height="130"
    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 1 }}
  >
    <defs>
      <pattern id="chatpat" x="0" y="0" width="130" height="130" patternUnits="userSpaceOnUse">
        {/* BG */}
        <rect width="130" height="130" fill="#0c1c30" />

        {/* Bed */}
        <rect x="8" y="16" width="26" height="14" rx="2" fill="none" stroke="#1d3a60" strokeWidth="1.3"/>
        <rect x="11" y="12" width="7" height="6" rx="1.5" fill="none" stroke="#1d3a60" strokeWidth="1.2"/>
        <rect x="22" y="12" width="7" height="6" rx="1.5" fill="none" stroke="#1d3a60" strokeWidth="1.2"/>
        <line x1="8" y1="28" x2="8" y2="33" stroke="#1d3a60" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="34" y1="28" x2="34" y2="33" stroke="#1d3a60" strokeWidth="1.3" strokeLinecap="round"/>

        {/* Palm tree */}
        <line x1="80" y1="48" x2="80" y2="20" stroke="#1d3a60" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M80 22 Q71 14 65 18 Q73 19 77 25" fill="none" stroke="#1d3a60" strokeWidth="1.2"/>
        <path d="M80 22 Q89 14 95 18 Q87 20 83 26" fill="none" stroke="#1d3a60" strokeWidth="1.2"/>
        <path d="M80 28 Q73 20 67 24 Q74 25 78 30" fill="none" stroke="#1d3a60" strokeWidth="1.2"/>
        <ellipse cx="80" cy="50" rx="4" ry="2.5" fill="none" stroke="#1d3a60" strokeWidth="1.2"/>

        {/* Sun top-right */}
        <circle cx="118" cy="18" r="6" fill="none" stroke="#1d3a60" strokeWidth="1.3"/>
        <line x1="118" y1="9" x2="118" y2="7" stroke="#1d3a60" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="118" y1="27" x2="118" y2="29" stroke="#1d3a60" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="109" y1="18" x2="107" y2="18" stroke="#1d3a60" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="127" y1="18" x2="129" y2="18" stroke="#1d3a60" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="111" y1="11" x2="109" y2="9" stroke="#1d3a60" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="125" y1="25" x2="127" y2="27" stroke="#1d3a60" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="125" y1="11" x2="127" y2="9" stroke="#1d3a60" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="111" y1="25" x2="109" y2="27" stroke="#1d3a60" strokeWidth="1.2" strokeLinecap="round"/>

        {/* Cocktail glass */}
        <path d="M47 57 L56 68 L52 68 L52 76 L61 76" fill="none" stroke="#1d3a60" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M65 57 L56 68" fill="none" stroke="#1d3a60" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="43" y1="76" x2="61" y2="76" stroke="#1d3a60" strokeWidth="1.3" strokeLinecap="round"/>

        {/* Waves */}
        <path d="M6 90 Q11 85 17 90 Q23 95 29 90 Q35 85 41 90" fill="none" stroke="#1d3a60" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M6 98 Q11 93 17 98 Q23 103 29 98 Q35 93 41 98" fill="none" stroke="#1d3a60" strokeWidth="1.3" strokeLinecap="round"/>

        {/* Suitcase */}
        <rect x="84" y="82" width="24" height="18" rx="3" fill="none" stroke="#1d3a60" strokeWidth="1.3"/>
        <rect x="90" y="78" width="12" height="6" rx="2" fill="none" stroke="#1d3a60" strokeWidth="1.2"/>
        <line x1="96" y1="82" x2="96" y2="100" stroke="#1d3a60" strokeWidth="1.2"/>
        <line x1="84" y1="91" x2="108" y2="91" stroke="#1d3a60" strokeWidth="1.2"/>

        {/* Map pin */}
        <path d="M24 115 Q24 108 31 108 Q38 108 38 115 Q38 122 31 130 Q24 122 24 115Z" fill="none" stroke="#1d3a60" strokeWidth="1.3"/>
        <circle cx="31" cy="115" r="3" fill="none" stroke="#1d3a60" strokeWidth="1.2"/>

        {/* Compass */}
        <circle cx="112" cy="112" r="10" fill="none" stroke="#1d3a60" strokeWidth="1.3"/>
        <polygon points="112,103 114,112 112,121 110,112" fill="none" stroke="#1d3a60" strokeWidth="1.1"/>
        <polygon points="102,112 112,110 122,112 112,114" fill="none" stroke="#1d3a60" strokeWidth="1.1"/>

        {/* Fork & knife */}
        <line x1="68" y1="108" x2="68" y2="128" stroke="#1d3a60" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M65 108 L65 116 Q68 120 71 116 L71 108" fill="none" stroke="#1d3a60" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="78" y1="108" x2="78" y2="128" stroke="#1d3a60" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M75 108 Q78 113 81 108" fill="none" stroke="#1d3a60" strokeWidth="1.2" strokeLinecap="round"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#chatpat)"/>
  </svg>
);

const ChatDemo = () => (
  <div className="flex justify-center">
    <div className="w-full max-w-sm">
      <div
        className="overflow-hidden rounded-2xl"
        style={{
          border: "1px solid rgba(99,179,237,0.2)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0d2137 0%, #0a1f35 100%)",
            borderBottom: "1px solid rgba(99,179,237,0.15)",
          }}
          className="px-4 py-3 flex items-center gap-3"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
          >
            AI
          </div>
          <div>
            <div className="text-sm font-semibold text-white">AI Guest Assistant</div>
            <div className="text-xs" style={{ color: "rgba(147,197,253,0.7)" }}>24/7 WhatsApp Concierge</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #34d399" }} />
            <span className="text-xs text-emerald-400">Online</span>
          </div>
        </div>

        {/* Messages area with inline SVG pattern */}
        <div className="relative">
          {/* Pattern layer */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
            <PatternTile />
          </div>

          {/* Messages scroll container */}
          <div className="relative z-10 p-3 space-y-2 max-h-[420px] overflow-y-auto">
            {conversations.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`flex ${msg.from === "guest" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed"
                  style={
                    msg.from === "guest"
                      ? {
                          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                          color: "#ffffff",
                          borderBottomRightRadius: "4px",
                          boxShadow: "0 2px 8px rgba(99,102,241,0.4)",
                        }
                      : {
                          background: "rgba(10,24,42,0.85)",
                          backdropFilter: "blur(6px)",
                          color: "rgba(226,232,240,0.92)",
                          borderBottomLeftRadius: "4px",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }
                  }
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-3 py-2 flex items-center gap-2"
          style={{
            background: "#0a1929",
            borderTop: "1px solid rgba(99,179,237,0.1)",
          }}
        >
          <div
            className="flex-1 rounded-full px-3 py-1.5 text-xs"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(148,163,184,0.6)",
            }}
          >
            Type a message…
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs"
            style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
          >
            ➤
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ChatDemo;