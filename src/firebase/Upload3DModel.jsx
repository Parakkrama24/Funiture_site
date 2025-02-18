// src/Firebase/Upload3DModel.jsx
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "./firebaseConfig.js";
import "./Upload3DModel.css";

const Upload3DModel = ({ setModelImageUrl }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return; // Check if a file is selected
    const storageRef = ref(storage, `models/${file.name}`); // Reference to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressValue = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressValue); // Update progress state
      },
      (error) => {
        console.error("Upload error: ", error); // Handle upload error
      },
      () => {
        // Get the file's download URL after upload completes
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setModelImageUrl(url); // Set the URL in the Add component
          console.log("File available at: ", url);
        });
      }
    );
  };

  return (
    <div className="upload-3d-model-container">
        <input type="file" onChange={handleFileChange} />
        <button className="upload-3d-model-button" onClick={handleUpload}>
            Upload 3D Model
        </button>
        <p className="upload-progress">Upload Progress: {progress}%</p>
        {downloadURL && (
            <p className="upload-url">
                Model uploaded! Download URL: <a href={downloadURL}>{downloadURL}</a>
            </p>
        )}
    </div>
);

};

export default Upload3DModel;
