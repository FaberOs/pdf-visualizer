import React, { createContext, useState } from "react";

export const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectingText, setSelectingText] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const value = {
    pdfFile,
    setPdfFile,
    tags,
    setTags,
    selectingText,
    setSelectingText,
    selectedText,
    setSelectedText,
  };

  return <PdfContext.Provider value={value}>{children}</PdfContext.Provider>;
};
