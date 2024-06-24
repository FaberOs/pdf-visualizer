import React, { useContext, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PdfContext } from "../../context/PdfContext";
import { useNavigate } from "react-router-dom";
import { PiFilesFill } from "react-icons/pi";
import "../../styles/components/Layout/FileUpload.css";

const FileUpload = () => {
  const { setPdfFile } = useContext(PdfContext);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && file.type === "application/pdf") {
        setPdfFile(URL.createObjectURL(file));
        setFileName(file.name);
        navigate("/file-preview", {
          state: { fileUrl: URL.createObjectURL(file), fileName: file.name },
        });
      }
    },
    [setPdfFile, navigate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  return (
    <div className="upload-container" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta el archivo aquí...</p>
      ) : (
        <div className="placeholder">
          <PiFilesFill size={80} color="#409FFF" />
          <p>
            O{" "}
            <b>
              <u>búscalo</u>
            </b>{" "}
            en tus archivos
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
