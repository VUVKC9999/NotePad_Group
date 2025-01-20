import React, { useState, useEffect, useCallback } from "react";
import PopupComponent from "./PopupComponent";
import NotesGridComponent from "./NotesGridComponent";
import { fetchCardsEndpoint, addCardEndpoint } from "../endpoints/datafetch";
import { useNavigate,useParams } from "react-router-dom";

function HomePageComponent() {
  const [cards, setCards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // const [username,setUsername] = useState(useParams());
  const {username} = useParams();
  // console.log(username);
  const [loginStatus, setLoginStatus] = useState(true);
  const fetchCards = useCallback(async () => {
    const data = await fetchCardsEndpoint(username);
    setCards(data);
  }, [username]);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const addNote = () => setShowPopup(true);

  const closePopup = async (title, content) => {
    if (title && content) {
      const newNote = await addCardEndpoint(username,title, content);

      if (newNote) {
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
    setLoginStatus(false);
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    navigate("/login", { replace: true });
  };

  return (
    <div className="container mt-3">
      <div className="d-flex align-items-center justify-content-between mb-5">
        <h1 className="text-center mb-0 mx-auto" style={{ fontSize: "2rem", fontWeight: "600", color: "#4A90E2" }}>
          Welcome to Your Notes
        </h1>
        <div className="d-flex ml-auto">
          <button
            className="btn btn-primary me-4 px-4 py-2 rounded-pill"
            onClick={addNote}
            style={{
              fontSize: "0.8rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            + Add Note
          </button>
          <button
            className="btn btn-outline-danger px-4 py-2 rounded-pill"
            onClick={logout}
            style={{
              fontSize: "0.8rem",
              fontWeight: "500",
              border: "2px solid #E74C3C",
              color: "#E74C3C",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Logout
          </button>
        </div>
      </div>

      <NotesGridComponent username={username} cards={cards} setCards={setCards} />

      {showPopup && (
        <PopupComponent
          onSave={closePopup}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default HomePageComponent;
