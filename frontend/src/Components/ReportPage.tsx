import { motion } from "framer-motion";
import GradientButton from "./GradientButtonOnClick";
import RadioButtonGroup from "./RadioButtonGroup";

function ReportPage() {
  return (
    <div className="flex flex-col justify-center h-screen w-screen items-center space-y-10 p-6 bg-gray-200 gap-4 font-menlo">
      <div>
        <motion.span className="bg-gradient-to-r from-purple-600 via-red-500 to-amber-400 bg-clip-text text-transparent text-3xl mb-2">
          Dermafyr
        </motion.span>
      </div>
    </div>
  );
}

export default ReportPage;
