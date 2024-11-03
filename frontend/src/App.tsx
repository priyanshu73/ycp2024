import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import React from "react";
import GradientButton from "./Components/GradientButtonOnClick";
import GradientText from "./Components/GradientText";
import CameraPage from "./Components/CameraPage";
import FormPage from "./Components/FormPage";
import SkincareAnalysisDashboard from "./Components/SkincareAnalysisDashboard";
import { motion } from "framer-motion";
import Login from "./Components/Login";
import { Home } from "lucide-react";

// Separate HomePage component
function HomePage() {
  const navigate = useNavigate(); // useNavigate is now used within Router context

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-200 gap-2 font-menlo">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <GradientText text="Dermafyr" className="text-8xl mb-2" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <GradientButton
          buttonName="Get Started"
          onClick={() => navigate("/camera")}
        />
      </motion.div>
    </div>
  );
}

// Main App component
function App() {
  const [isElectronApp, setIsElectronApp] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("Window electron:", "electron" in window);
    console.log("Process type:", window?.process?.type);
    console.log("User Agent:", navigator.userAgent);

    const electronCheck = "electron" in window;
    console.log(electronCheck);
    setIsElectronApp(electronCheck);
    console.log("Is Electron app:", electronCheck);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/report" element={<SkincareAnalysisDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
