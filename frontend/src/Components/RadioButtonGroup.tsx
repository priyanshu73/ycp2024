import { useState } from "react";

const RadioButtonGroup = () => {
  const [selectedOption, setSelectedOption] = useState("never");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const getButtonStyles = (index: number, total: number) => {
    if (index === 0) return "rounded-l-full";
    if (index === total - 1) return "rounded-r-full";
    return "";
  };

  const getShadowShape = (index: number, total: number) => {
    if (index === 0) return "before:rounded-l-full after:rounded-l-full";
    if (index === total - 1)
      return "before:rounded-r-full after:rounded-r-full";
    return "";
  };

  const options = [
    { value: "not at all", label: "Not at all" }, // Replaced "Never" with "Seldom"
    { value: "unlikely", label: "Unlikely" },
    { value: "somewhat", label: "Somewhat" },
    { value: "likely", label: "Likely" },
    { value: "definitely", label: "Definitely" },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-12 w-full max-w-4xl rounded-full overflow-hidden bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
        <div className="flex h-full w-full">
          {options.map((option, index) => (
            <label
              key={option.value}
              className="relative flex-1 flex items-center justify-center"
            >
              <input
                type="radio"
                name="button-group"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleChange}
                className="hidden"
              />
              <span
                className={`
                  relative w-full h-full flex items-center justify-center
                  text-white text-base cursor-pointer
                  before:absolute before:inset-0
                  before:transition-all before:duration-300 before:ease-in-out
                  before:opacity-0
                  before:bg-black/5
                  ${
                    selectedOption !== option.value
                      ? "hover:before:opacity-100"
                      : ""
                  }
                  ${
                    selectedOption === option.value
                      ? "after:absolute after:inset-0 after:bg-black/10"
                      : ""
                  }
                  ${getButtonStyles(index, options.length)}
                  ${getShadowShape(index, options.length)}
                `}
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadioButtonGroup;
