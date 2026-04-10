import { motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

const Section = ({ children, className = "", id, style }: SectionProps) => (
  <motion.section
    id={id}
    style={style}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`section-padding ${className}`}
  >
    <div className="mx-auto max-w-7xl">{children}</div>
  </motion.section>
);

export default Section;