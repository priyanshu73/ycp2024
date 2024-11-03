interface GradientButtonProps {
  buttonName: string; // Prop for the button text
  onClick: () => void; // Prop for the click handler
  type?: "submit" | "reset" | "button";
}

const GradientButton: React.FC<GradientButtonProps> = ({
  buttonName,
  onClick,
  type,
}) => {
  return (
    <button
      className="relative overflow-hidden rounded-2xl px-20 py-6 bg-transparent border-none outline-none"
      onClick={onClick}
      type={type}
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
    </button>
  );
};

export default GradientButton;
