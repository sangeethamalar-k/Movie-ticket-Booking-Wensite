import React from "react";
import { useNavigate } from "react-router-dom";

export default function TheatreCard({ theatre, selectedMovie }) {
  const navigate = useNavigate();

  const handleBooktimeNow = (time) => {
    // ✅ Send selected movie, theatre, and showtime details to /main page
    navigate("/main", {
      state: {
        movie: selectedMovie,
        theatre: theatre,
        showTime: time,
      },
    });
  };

  return (
    <div className="theatre-card">
      <div className="theatre-header">
        <h3>{theatre.name}</h3>
        <span className={theatre.cancellable ? "green" : "red"}>
          {theatre.cancellable ? "Cancellation available" : "Non-cancellable"}
        </span>
      </div>

      <div className="showtimes">
        {theatre.shows.map((time, i) => (
          <button
            key={i}
            className="show-btn"
            onClick={() => handleBooktimeNow(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}