import React from "react";

function CardComponent({ title, content, onClick, onDelete }) {
  return (
    <div
      className="card shadow-sm rounded-4 position-relative"
      style={{
        width: "15rem",
        height: "15rem",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        border: "1px solid #ccc",
        boxShadow:"0 4px 8px rgba(0, 0, 0, 0.15)",
      }}
      onClick={onClick}
    >
      <button
        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        aria-label="Delete"
        style={{
          backgroundColor: "#f44336",
          borderRadius: "75%",
          padding: "0.5rem",
          fontSize: "1.2rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        &times;
      </button>

      <div className="card-body d-flex flex-column justify-content p-3">
        <h5
          className="card-title text-center mb-3 fw-bold"
          style={{
            fontSize: "1.25rem",
            color: "#333",
            textTransform: "capitalize",
            lineHeight: "1.4",
          }}
        >
          {title}
        </h5>
        <p
          className="card-text"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 6,
            WebkitBoxOrient: "vertical",
            fontSize: "1rem",
            color: "#555",
            lineHeight: "1.6",
          }}
        >
          {content}
        </p>
      </div>

      <style>{`
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}

export default CardComponent;
