import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import GradientButton from "./GradientButtonOnClick";
import { motion } from "framer-motion";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

export const CameraPage: React.FC = () => {
  const [image, setImage] = useState<string>("");
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    }
  }, [webcamRef]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-200 gap-4 font-menlo">
      {/* Header Text */}
      {/* Webcam or Captured Image */}
      <motion.span className="bg-gradient-to-r from-purple-600 via-red-500 to-amber-400 bg-clip-text text-transparent text-3xl mb-2">
        Dermafyr
      </motion.span>
      <div className="webcam-container">
        {image === "" ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            videoConstraints={videoConstraints}
            className="mirror rounded-md border-2 shadow-lg border-white"
          />
        ) : (
          <img
            src={image}
            alt="Captured"
            className="rounded-md object-cover border-2 border-white shadow-lg"
          />
        )}
      </div>

      {/* Capture or Retake Button */}
      <div className="mt-4">
        {image !== "" ? (
          <GradientButton
            buttonName="Retake Image"
            onClick={() => setImage("")}
          />
        ) : (
          <GradientButton buttonName="Capture" onClick={capture} />
        )}
      </div>
    </div>
  );
};

export default CameraPage;
