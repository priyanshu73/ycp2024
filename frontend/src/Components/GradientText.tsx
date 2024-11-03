import { motion } from "framer-motion";

const GradientText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r from-purple-600 via-red-500 to-amber-400 bg-clip-text text-transparent ${className}`}
    >
      {text}
    </motion.span>
  );
};

export default GradientText;
