import React, { useState } from "react";

function NotesPopupComponent({ title, content, onSave, onCancel }) {
  const handleSave = () => {
    onSave(title, content);
  };

  return (
    <div
      className="popup-overlay d-flex justify-content-center align-items-center"
      role="dialog"
      aria-labelledby="add-note-title"
      aria-modal="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
    >
      <div
        className="popup-content bg-white p-4 rounded"
        style={{ width: "400px" }}
      >
        <h1 className="card-title text-center mb-3">{title}</h1>
        <div className="card-body d-flex flex-column justify-content">
          <h1 className="card-title text-center mb-3">{title}</h1>
          <p
            className="card-text"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
            }}
          >
            {content}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesPopupComponent;
