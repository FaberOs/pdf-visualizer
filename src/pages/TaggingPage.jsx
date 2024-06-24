import React from "react";
import PdfViewer from "../components/Layout/PdfViewer";
import TagForm from "../components/Layout/TagForm";
import "../styles/pages/TaggingPage.css"; // Importa el archivo CSS

const TaggingPage = () => {
  return (
    <div className="tagging-page-container">
      <div className="pdf-viewer-container">
        <PdfViewer />
      </div>
      <div className="tag-form-container">
        <TagForm />
      </div>
    </div>
  );
};

export default TaggingPage;
