import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import FilePreviewPage from "./pages/FilePreviewPage";
import TaggingPage from "./pages/TaggingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/file-preview" element={<FilePreviewPage />} />
        <Route path="/tagging" element={<TaggingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
