import React from "react";
import { Link } from "react-router-dom";

interface GradientButtonProps {
  buttonName: string;
  to: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ buttonName, to }) => {
  return (
    <Link
      to={to}
      className="relative overflow-hidden rounded-2xl px-20 py-6 bg-transparent border-none focus:outline-none"
    >
      {/* Button Body */}
      <span className="absolute inset-px z-10 flex items-center justify-center rounded-2xl bg-gray-100 bg-gradient-to-t from-neutral-300 text-gray-800">
        {buttonName}
      </span>

      {/* Animated Border */}
      <span
        aria-hidden
        className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
      />
    </Link>
  );
};

export default GradientButton;
