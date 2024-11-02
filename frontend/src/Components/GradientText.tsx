import { motion } from "framer-motion";

const GradientText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  return (
    <motion.span
      initial={{ x: "100%" }} // Start off-screen to the right
      animate={{ x: "0%" }} // Animate to the center of the screen
      transition={{
        duration: 1.5, // Set duration of the animation
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
      }}
      className={`bg-gradient-to-r from-purple-600 via-red-500 to-amber-400 bg-clip-text text-transparent ${className}`}
    >
      {text}
    </motion.span>
  );
};

export default GradientText;
