import React, { useState } from "react";

const NumberCircles: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (number: number) => {
    setSelected(number);
    console.log(`Rectangle ${number} clicked`);
  };

  const getColor = (index: number): string => {
    const maxIntensity = 250;
    const half = 4 / 2;
    let red, green;

    if (index <= half) {
      red = maxIntensity;
      green = Math.floor((index / half) * maxIntensity);
    } else {
      red = Math.floor(maxIntensity - ((index - half) / half) * maxIntensity);
      green = maxIntensity;
    }

    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="flex justify-around items-center space-x-12">
      {[1, 2, 3, 4, 5].map((number, index) => {
        const isSelected = selected === number;
        return (
          <div
            key={number}
            onClick={() => handleClick(number)}
            style={{
              backgroundColor: getColor(index),
              width: "35px", // Adjusted for a more rectangular shape
              height: "35px",
            }}
            className={`flex justify-center items-center rounded-3xl text-gray-200 font-bold cursor-pointer 
              transition-transform duration-300 ease-in-out text-outline border-2 shadow-lg border-gray-300
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
