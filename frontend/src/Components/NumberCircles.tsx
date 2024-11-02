import React, { useState } from "react";

const NumberCircles: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (number: number) => {
    setSelected(number);
    console.log(`Circle ${number} clicked`);
  };

  const getColor = (index: number): string => {
    const colorValue = Math.floor((index / 4) * 255); // Transition from red to green
    return `rgb(${255 - colorValue}, ${colorValue}, 0)`;
  };

  return (
    <div className="flex justify-around items-center h-screen">
      {[1, 2, 3, 4, 5].map((number, index) => {
        const isSelected = selected === number;
        return (
          <div
            key={number}
            onClick={() => handleClick(number)}
            style={{
              backgroundColor: getColor(index),
              width: "50px", // Inline styles for width
              height: "50px", // Inline styles for height
            }}
            className={`flex justify-center items-center rounded-full text-white cursor-pointer 
              transition-transform duration-300 ease-in-out 
              ${isSelected ? "scale-150" : "scale-100"}`}
          >
            {number}
          </div>
        );
      })}
    </div>
  );
};

export default NumberCircles;
