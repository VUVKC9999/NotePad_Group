import React, { useState, useEffect, useCallback } from "react";
import CardComponent from "./CardComponent";
import { fetchCardsEndpoint, deleteCardEndpoint } from "../endpoints/datafetch";  // Import deleteCardEndpoint
const baseUrl = "http://127.0.0.1:3000/api/";

function NotesGridComponent({ cards, setCards }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchCards = useCallback(async () => {
    const data = await fetchCardsEndpoint();
    setCards(data);
  }, []);

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCard(null);
  };

  const deleteCard = async (index) => {
    const cardToDelete = cards[index];
    const isDeleted = await deleteCardEndpoint(cardToDelete._id);  // Call the new deleteCardEndpoint function

    if (isDeleted) {
      setCards((prevCards) => prevCards.filter((_, i) => i !== index));
    } else {
      console.error("Failed to delete card");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <CardComponent
                  title={card.title}
                  content={card.content}
                  onClick={() => handleCardClick(card)}
                  onDelete={() => deleteCard(index)}
                />
              </div>
            ))
          ) : (
            <p className="text-center">No notes available. Add one!</p>
          )}
        </div>
      </div>

      {showPopup && selectedCard && (
        <div
          className="popup-overlay d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
          onClick={closePopup}
        >
          <div
            className="popup-content bg-white p-4 rounded"
            style={{ width: "500px", cursor: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-3">Card Details</h3>
            <p>
              <strong>Title:</strong> {selectedCard.title}
            </p>
            <p>
              <strong>Content:</strong> {selectedCard.content}
            </p>
            <button className="btn btn-secondary" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NotesGridComponent;
