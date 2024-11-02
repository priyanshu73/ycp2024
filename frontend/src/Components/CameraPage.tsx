import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import GradientButton from "./GradientButtonOnClick";
import { motion } from "framer-motion";
import axios from 'axios';


const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

interface ImageInfo {
  filename: string;
  content_type: string;
  format: string;   
  size: [number, number];
  width: number;
  height: number;
  file_size_kb: number;
}

interface ApiResponse {
  status: 'success' | 'error';
  message: string;
  user_data?: {
    name: string;
    skin_type: string;
    email: string;
    age: number;
  };
  image_data?: ImageInfo;
}

export const CameraPage: React.FC = () => {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [skinType, setSkinType] = useState<string>("");
  const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);

  const webcamRef = useRef<Webcam>(null);

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleCapture = useCallback(async () => {
    try {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc) {
        throw new Error('Failed to capture image');
      }

      setImage(imageSrc);

      // Validate form data
      if (!name || !age || !email || !skinType) {
        throw new Error('Please fill in all fields');
      }

      setIsLoading(true);
      
      // Convert base64 to File object
      const imageFile = dataURLtoFile(imageSrc, `${name}_photo.jpg`);

      // Create FormData
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('name', name);
      formData.append('age', age.toString());
      formData.append('email', email);
      formData.append('skin_type', skinType);

      // Send data to backend
      const response = await axios.post<ApiResponse>('http://127.0.0.1:8000/userInfo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'success') {
        setStatus({
          type: 'success',
          message: response.data.message
        });

        if (response.data.image_data) {
          setImageInfo(response.data.image_data);
        }

        // Reset form
        setName("");
        setAge(0);
        setEmail("");
        setSkinType("");
        setImage("");
      } else {
        throw new Error(response.data.message);
      }

    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  }, [webcamRef, name, age, email, skinType]);

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
          <GradientButton buttonName="Capture" onClick={handleCapture} />
        )}
      </div>
    </div>
  );
};

export default CameraPage;