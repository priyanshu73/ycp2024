import React, { useState, useEffect } from "react";

interface TextWidgetProps {
  text: string;
}

const TextWidget: React.FC<TextWidgetProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<string>(""); // Store all displayed words as a single string
  const words = text.trim().split(/\s+/); // Split words, ignoring multiple spaces

  useEffect(() => {
    setDisplayedText(""); // Reset displayed text on text change

    const addWord = (index: number) => {
      if (index < words.length) {
        // Reconstruct the string up to the current word
        const newText = words.slice(0, index + 1).join(" ");
        setDisplayedText(newText);
        setTimeout(() => addWord(index + 1), 100); // Add next word after delay
      }
    };

    addWord(0); // Start recursive word addition
  }, [text]);

  return (
    <div className="inline-block relative text-min-width">
      <div className="relative w-full overflow-hidden rounded-2xl p-6 bg-transparent border-none outline-none">
        <div className="relative z-10 flex flex-wrap items-start justify-start text-left rounded-2xl bg-gray-100 bg-gradient-to-t from-neutral-200 text-gray-800 p-4 break-words">
          <span className="animate-fadeIn">{displayedText}</span>{" "}
          {/* Render all displayed text in one span */}
        </div>
      </div>
    </div>
  );
};

export default TextWidget;
