import React, { useState } from "react";

function PopupComponent({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
        <h3 id="add-note-title" className="mb-3">Add Note</h3>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className="form-control mb-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
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

export default PopupComponent;
