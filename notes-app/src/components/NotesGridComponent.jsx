import React, { useState, useEffect, useCallback } from "react";
import CardComponent from "./CardComponent";
import { fetchCardsEndpoint, deleteCardEndpoint } from "../endpoints/datafetch";

function NotesGridComponent({ cards, setCards }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchCards = useCallback(async () => {
    const data = await fetchCardsEndpoint();
    setCards(data);
  }, []);

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const deleteCard = async (index) => {
    const cardToDelete = cards[index];
    const isDeleted = await deleteCardEndpoint(cardToDelete._id);

    if (isDeleted) {
      setCards((prevCards) => prevCards.filter((_, i) => i !== index));
    } else {
      console.error("Failed to delete card");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <div className="col-md-3 mb-3" key={index}>
                <CardComponent
                  title={card.title}
                  content={card.content}
                  onClick={() => handleCardClick(card)}
                  onDelete={() => deleteCard(index)}
                />
              </div>
            ))
          ) : (
            <p className="text-center w-100">No notes available. Add one!</p>
          )}
        </div>
      </div>

      {selectedCard && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="cardDetailsModal"
          aria-hidden="true"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="cardDetailsModal">
                  Card Details
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setSelectedCard(null)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Title:</strong> {selectedCard.title}
                </p>
                <p>
                  <strong>Content:</strong> {selectedCard.content}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedCard(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NotesGridComponent;
