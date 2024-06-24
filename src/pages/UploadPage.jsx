import React from "react";
import FileUpload from "../components/Layout/FileUpload";
import "../styles/pages/UploadPage.css";

const UploadPage = () => {
  return (
    <div className="upload-page">
      <h1>¿Qué archivos quieres subir?</h1>
      <FileUpload />
    </div>
  );
};

export default UploadPage;
