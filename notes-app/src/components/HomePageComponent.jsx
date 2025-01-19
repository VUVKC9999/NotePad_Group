import React, { useState, useEffect, useCallback } from "react";
import PopupComponent from "./PopupComponent";
import NotesGridComponent from "./NotesGridComponent";
import { fetchCardsEndpoint, addCardEndpoint } from "../endpoints/datafetch";
import { useNavigate } from "react-router-dom";

function HomePageComponent() {
  const [cards, setCards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loginStatus, setloginStatus] = useState(true);
  const fetchCards = useCallback(async () => {
    const data = await fetchCardsEndpoint();
    setCards(data);
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const addNote = () => setShowPopup(true);

  const closePopup = async (title, content) => {
    if (title && content) {
      const newNote = await addCardEndpoint(title, content);

      if (newNote) {
        console.log("Note added successfully", newNote);
        setCards((prevCards) => [...prevCards, newNote]);
      } else {
        console.error("Failed to add note.");
      }
    } else {
      alert("Please enter both title and content.");
    }
    setShowPopup(false);
  };

  const logout = () => {
    setloginStatus(false);
    console.log(`prev:${localStorage}\n${sessionStorage}`);
    localStorage.clear();
    sessionStorage.clear();
    console.log(`after:${localStorage}\n${sessionStorage}`);
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="text-center mb-0 mx-auto">Homepage</h1>
        <div className="d-flex ml-auto p-3">
          <button
            className="btn btn-primary"
            onClick={addNote}
            style={{
              fontSize: "19px",
              backgroundColor: "gray",
              color: "white",
            }}
          >
            +
          </button>
          <button
            className="btn btn-primary"
            onClick={logout}
            style={{
              fontSize: "19px",
              backgroundColor: "gray",
              color: "white",
            }}
          >
            logout
          </button>
        </div>
      </div>

      <NotesGridComponent cards={cards} setCards={setCards} />
      {showPopup && (
        <PopupComponent
          onSave={closePopup}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </>
  );
}

export default HomePageComponent;
