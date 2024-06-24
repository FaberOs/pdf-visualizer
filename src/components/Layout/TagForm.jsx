import React, { useState, useContext, useEffect } from "react";
import { PdfContext } from "../../context/PdfContext";
import ButtonComponent from "../UI/ButtonComponent";
import InputComponent from "../UI/InputComponent";
import SelectComponent from "../UI/SelectComponent";
import "../../styles/components/Layout/TagForm.css";

const TagForm = () => {
  const {
    tags,
    setTags,
    selectingText,
    setSelectingText,
    selectedText,
    setSelectedText,
  } = useContext(PdfContext);
  const [templateName, setTemplateName] = useState("");
  const [tagName, setTagName] = useState("");
  const [tagType, setTagType] = useState("");
  const [isTemplateNameValid, setIsTemplateNameValid] = useState(false);
  const [isTagNameValid, setIsTagNameValid] = useState(false);

  const handleAddTag = () => {
    const newTag = { name: tagName, type: tagType, text: selectedText };
    setTags([...tags, newTag]);
    setTagName("");
    setTagType("");
    setSelectedText("");
  };

  const handleSaveTemplate = () => {
    // Implementar lógica para guardar la plantilla y terminar el etiquetado
    console.log("Guardar plantilla y terminar etiquetado");
  };

  const validateTemplateName = (name) => {
    setIsTemplateNameValid(name.trim() !== "");
    setTemplateName(name);
  };

  const validateTagName = (name) => {
    setIsTagNameValid(name.trim() !== "");
    setTagName(name);
  };

  const handleSelectPosition = () => {
    if (tagType === "Texto") {
      setSelectingText(true);
    }
  };

  useEffect(() => {
    if (selectedText) {
      handleAddTag();
      setSelectingText(false);
    }
  }, [selectedText]);

  return (
    <div className="tag-form-container">
      <h2>Etiquetado de datos</h2>
      <div className="input-button-row">
        <InputComponent
          label="Nombre de la plantilla"
          value={templateName}
          onChange={(e) => validateTemplateName(e.target.value)}
          placeholder="Nombre de la plantilla"
          isValid={isTemplateNameValid}
        />
        <div className="input-button-row">
          <ButtonComponent
            label="Guardar"
            onClick={handleSaveTemplate}
            disabled={!isTemplateNameValid}
          />
        </div>
      </div>
      <InputComponent
        label="Crear una nueva etiqueta"
        value={tagName}
        onChange={(e) => validateTagName(e.target.value)}
        placeholder="Nombre de la etiqueta"
        isValid={isTagNameValid}
      />
      <SelectComponent
        label=""
        value={tagType}
        onChange={(e) => setTagType(e.target.value)}
        options={[
          { value: "", label: "Tipo de etiqueta" },
          { value: "Texto", label: "Texto" },
          { value: "Tabla", label: "Tabla" },
          { value: "Imagen", label: "Imagen" },
        ]}
      />
      <ButtonComponent
        label="Seleccionar posición"
        onClick={handleSelectPosition}
        disabled={tagType !== "Texto"}
      />
      <h3>Etiquetas actuales</h3>
      {tags.length === 0 ? (
        <p>No hay etiquetas actuales</p>
      ) : (
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>
              {tag.name} - {tag.type} {tag.text && `- "${tag.text}"`}
            </li>
          ))}
        </ul>
      )}
      <ButtonComponent
        label="Guardar plantilla y terminar etiquetado"
        onClick={handleSaveTemplate}
        disabled={tags.length === 0}
      />
    </div>
  );
};

export default TagForm;
