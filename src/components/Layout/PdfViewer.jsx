/* PdfViewer, codigo original de la documentacion, sin modificaciones */
/* https://github.com/react-pdf-viewer/examples/blob/main/highlight/HighlightExample.tsx */

import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Worker,
  Viewer,
  Position,
  Tooltip,
  Button,
  PrimaryButton,
  DocumentLoadEvent,
} from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import {
  highlightPlugin,
  MessageIcon,
  HighlightArea,
} from "@react-pdf-viewer/highlight";
import { PdfContext } from "../../context/PdfContext";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";

const PdfViewer = () => {
  const { pdfFile, selectingText, setSelectingText, setSelectedText } =
    useContext(PdfContext);
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");
  const notesContainerRef = useRef(null);
  let noteId = notes.length;

  const noteEles = new Map();
  const [currentDoc, setCurrentDoc] = useState(null);

  const handleDocumentLoad = (e) => {
    setCurrentDoc(e.doc);
    if (currentDoc && currentDoc !== e.doc) {
      setNotes([]);
    }
  };

  const renderHighlightTarget = (props) => (
    <div
      style={{
        background: "#eee",
        display: "flex",
        position: "absolute",
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: "translate(0, 8px)",
        zIndex: 1,
      }}
    >
      <Tooltip
        position={Position.TopCenter}
        target={
          <Button onClick={props.toggle}>
            <MessageIcon />
          </Button>
        }
        content={() => <div style={{ width: "100px" }}>Agregar nota</div>}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  );

  const renderHighlightContent = (props) => {
    const addNote = () => {
      if (message !== "") {
        const note = {
          id: ++noteId,
          content: message,
          highlightAreas: props.highlightAreas,
          quote: props.selectedText,
        };
        setNotes(notes.concat([note]));
        props.cancel();
        setMessage("");
      }
    };

    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(0, 0, 0, .3)",
          borderRadius: "2px",
          padding: "8px",
          position: "absolute",
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
          zIndex: 1,
        }}
      >
        <div>
          <textarea
            rows={3}
            style={{
              border: "1px solid rgba(0, 0, 0, .3)",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "8px",
          }}
        >
          <div style={{ marginRight: "8px" }}>
            <PrimaryButton onClick={addNote}>Agregar</PrimaryButton>
          </div>
          <Button onClick={props.cancel}>Cancelar</Button>
        </div>
      </div>
    );
  };

  const jumpToNote = (note) => {
    activateTab(3);
    const notesContainer = notesContainerRef.current;
    if (noteEles.has(note.id) && notesContainer) {
      notesContainer.scrollTop = noteEles
        .get(note.id)
        .getBoundingClientRect().top;
    }
  };

  const renderHighlights = (props) => (
    <div>
      {notes.map((note) => (
        <React.Fragment key={note.id}>
          {note.highlightAreas
            .filter((area) => area.pageIndex === props.pageIndex)
            .map((area, idx) => (
              <div
                key={idx}
                style={Object.assign(
                  {},
                  {
                    background: "yellow",
                    opacity: 0.4,
                  },
                  props.getCssProperties(area, props.rotation)
                )}
                onClick={() => jumpToNote(note)}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  );

  const handleTextSelect = (props) => {
    if (selectingText) {
      setSelectedText(props.selectedText);
      props.cancel();
      setSelectingText(false);
    }
  };

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget: selectingText
      ? handleTextSelect
      : renderHighlightTarget,
    renderHighlightContent: selectingText ? null : renderHighlightContent,
    renderHighlights,
  });

  const { jumpToHighlightArea } = highlightPluginInstance;

  useEffect(() => {
    return () => {
      noteEles.clear();
    };
  }, []);

  const sidebarNotes = (
    <div
      ref={notesContainerRef}
      style={{
        overflow: "auto",
        width: "100%",
      }}
    >
      {notes.length === 0 && (
        <div style={{ textAlign: "center" }}>No hay notas</div>
      )}
      {notes.map((note) => {
        return (
          <div
            key={note.id}
            style={{
              borderBottom: "1px solid rgba(0, 0, 0, .3)",
              cursor: "pointer",
              padding: "8px",
            }}
            onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
            ref={(ref) => {
              noteEles.set(note.id, ref);
            }}
          >
            <blockquote
              style={{
                borderLeft: "2px solid rgba(0, 0, 0, 0.2)",
                fontSize: ".75rem",
                lineHeight: 1.5,
                margin: "0 0 8px 0",
                paddingLeft: "8px",
                textAlign: "justify",
              }}
            >
              {note.quote}
            </blockquote>
            {note.content}
          </div>
        );
      })}
    </div>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) =>
      defaultTabs.concat({
        content: sidebarNotes,
        icon: <MessageIcon />,
        title: "Notas",
      }),
  });
  const { activateTab } = defaultLayoutPluginInstance;

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      {pdfFile && (
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
        >
          <Viewer
            fileUrl={pdfFile}
            plugins={[highlightPluginInstance, defaultLayoutPluginInstance]}
            onDocumentLoad={handleDocumentLoad}
          />
        </Worker>
      )}
    </div>
  );
};

export default PdfViewer;
