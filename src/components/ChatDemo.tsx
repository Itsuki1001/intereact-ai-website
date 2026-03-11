import { motion } from "framer-motion";

interface ChatMessage {
  from: "guest" | "ai";
  text: string;
}

const conversations: ChatMessage[] = [
  { from: "guest", text: "What rooms do you have?" },
  { from: "ai", text: "We have Deluxe Rooms, Premium Suites, and Pool Villas. Each comes with AC, Wi-Fi, and breakfast. Would you like details on any?" },
  { from: "guest", text: "Show me room photos" },
  { from: "ai", text: "📸 Here are our room photos! [3 images attached]\n\nWould you like to see more or check availability?" },
  { from: "guest", text: "Where is the resort located?" },
  { from: "ai", text: "📍 We're located in Munnar, Kerala. Here's our Google Maps location: [Location shared]\n\n~3hrs from Cochin International Airport." },
  { from: "guest", text: "Can I book a room for tomorrow?" },
  { from: "ai", text: "Let me check availability for tomorrow... ✅ We have Deluxe Rooms available! For how many guests? I'll send you the booking link." },
];

const ChatDemo = () => (
  <div className="flex justify-center">
    <div className="w-full max-w-sm">
      <div className="glass-card overflow-hidden">
        {/* Phone header */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-3 flex items-center gap-3 border-b border-border/30">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">IA</div>
          <div>
            <div className="text-sm font-semibold text-foreground">Resort AI Assistant</div>
            <div className="text-xs text-muted-foreground">Online • Powered by Interact AI</div>
          </div>
        </div>
        {/* Messages */}
        <div className="p-3 space-y-2 max-h-[420px] overflow-y-auto bg-background/40">
          {conversations.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className={`flex ${msg.from === "guest" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                  msg.from === "guest"
                    ? "bg-primary/20 text-foreground rounded-br-sm"
                    : "bg-secondary text-secondary-foreground rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ChatDemo;
