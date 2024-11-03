import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import GradientButton from "./Components/GradientButton";
import GradientText from "./Components/GradientText"; // Adjust the path as necessary
import CameraPage from "./Components/CameraPage";
import FormPage from "./Components/FormPage";
import Login from "./Components/Login";
import { Auth0ProviderWithNavigate } from "./auth/auth-provider";
// // import { getConfig } from './config'; // Import getConfig function from config.ts
// // import { isElectron } from "./environment";

function App() {
  const [isElectronApp, setIsElectronApp] = React.useState<boolean>(false);
  React.useEffect(() => {
    console.log("Window electron:", "electron" in window);
    console.log("Process type:", window?.process?.type);
    console.log("User Agent:", navigator.userAgent);

    const electronCheck = "electron" in window;
    setIsElectronApp(electronCheck);
    console.log("Is Electron app:", electronCheck);
  }, []);
  // const config = getConfig();
  return (
    <Router>
      <Auth0ProviderWithNavigate> 
      <Routes>
        <Route
          path="/"
          element={
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-200 gap-2 font-menlo">
              <GradientText
                text="Dermafyr"
                className="text-8xl mb-2 transition-none"
              />
              {isElectronApp ? 
              <GradientButton buttonName="Get Started" to="/camera" />
              : <Login />
              }    
            </div>
          }
        />
        <Route
          path="/login"
          element={
            
              <Login />
            
          }
        />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
      </Auth0ProviderWithNavigate>
    </Router>
  );
}

export default App;
