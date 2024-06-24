import React from "react";
import { useLocation } from "react-router-dom";
import { BiSolidFilePdf } from "react-icons/bi";
import ButtonComponent from "../components/UI/ButtonComponent";
import "../styles/pages/FilePreviewPage.css";

const FilePreviewPage = () => {
  const location = useLocation();
  const { fileName } = location.state || {};

  return (
    <div className="file-preview-page">
      <h1>¿Qué quieres hacer con el archivo?</h1>
      <div className="file-preview-container">
        <BiSolidFilePdf size={80} color="#FF9473" />
        <p>{fileName}</p>
      </div>
      <ButtonComponent
        label="Crear plantilla para leer datos"
        route="/tagging"
      />
    </div>
  );
};

export default FilePreviewPage;
