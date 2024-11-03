import { motion } from "framer-motion";
import NumberCircles from "./NumberCircles";
import GradientButton from "./GradientButtonOnClick";
import RadioButtonGroup from "./RadioButtonGroup";
import { useNavigate } from "react-router-dom";
import GradientText from "./GradientText";

function FormPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center h-screen w-screen items-center space-y-10 p-6 bg-gray-200 gap-4 font-menlo">
      <div>
        <header className="text-center mb-8">
          <div className="text-2xl">
            <GradientText text="Answer a Few Questions to Refine Your Analysis" />
          </div>
          <p className="text-gray-600">
            Share details about your skin to help us create a personalized
            skincare routine.
          </p>
        </header>
        <p className="text-lg text-gray-500 font-semibold mb-6 mt-6">
          On a scale of 1 to 5, how oily is your skin?
        </p>
        <RadioButtonGroup />
        <p className="text-lg text-gray-500 font-semibold mb-6 mt-16">
          On a scale of 1 to 5, how dry is your skin?
        </p>
        <RadioButtonGroup />

        <p className="text-lg text-gray-500 font-semibold mb-6 mt-16">
          On a scale of 1 to 5, how intensive is your skincare routine?
        </p>
        <RadioButtonGroup />
      </div>
      <GradientButton
        buttonName="Submit"
        onClick={() => {
          navigate("/report");
        }}
      />
    </div>
  );
}

export default FormPage;
