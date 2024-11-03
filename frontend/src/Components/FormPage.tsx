import { motion } from "framer-motion";
import NumberCircles from "./NumberCircles";
import GradientButton from "./GradientButtonOnClick";
import RadioButtonGroup from "./RadioButtonGroup";

function FormPage() {
  return (
    <div className="flex flex-col justify-center h-screen w-screen items-center space-y-10 p-6 bg-gray-200 gap-4 font-menlo">
      <div>
        <motion.span className="bg-gradient-to-r from-purple-600 via-red-500 to-amber-400 bg-clip-text text-transparent text-3xl mb-2">
          Dermafyr
        </motion.span>
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
      <GradientButton buttonName="Submit" onClick={() => {}} />
    </div>
  );
}

export default FormPage;
