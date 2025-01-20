import React, { useState } from "react";

function PopupComponent({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    onSave(title, content);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addNoteModal"
      aria-hidden="true"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{ maxWidth: "500px" }}
      >
        <div className="modal-content shadow-lg rounded-3">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title" id="addNoteModal">
              Add Note
            </h5>
            {/* <button
              type="button"
              className="close text-white"
              aria-label="Close"
              onClick={onCancel}
            >
              <span aria-hidden="true">&times;</span>
            </button> */}
          </div>
          <div className="modal-body p-4">
            <form>
              <div className="form-group mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  id="content"
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="4"
                  required
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupComponent;
