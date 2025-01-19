import React from "react";

function CardComponent({ title, content, onClick, onDelete }) {
  return (
    <div
      className="card border border-2 rounded border-dark p-3 position-relative"
      style={{ width: "15rem", height: "15rem", overflow: "hidden" }}
      onClick={onClick}
    >
      <button
        className="btn btn-danger btn-sm position-absolute"
        style={{ top: "5px", right: "5px" }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        aria-label="Delete"
      >
        &times;
      </button>

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
    </div>
  );
}

export default CardComponent;
