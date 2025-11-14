import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { movies, theatres, menu } from "./data";
import SeatBooking from "./SeatBooking";
import FoodOrder from "./FoodOrder";
import ReviewSection from "./ReviewSection";
import "./styles.css";

function Main() {
  const location = useLocation();

  // ✅ Extract objects from navigation state
  const { movie, theatre, showTime } = location.state || {};

  // ✅ Default movie and theatre (fallback to first item if none)
  const [selectedMovie, setSelectedMovie] = useState(movie || movies[0]);
  const [selectedTheatre, setSelectedTheatre] = useState(theatre || theatres[0]);

  // ✅ Load booked seats from localStorage
  const [bookedSeats, setBookedSeats] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bookedSeats")) || {};
    } catch {
      return {};
    }
  });

  // ✅ Load food orders from localStorage
  const [foodOrders, setFoodOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("foodOrders")) || {};
    } catch {
      return {};
    }
  });

  // ✅ Persist to localStorage
  useEffect(() => {
    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
  }, [bookedSeats]);

  useEffect(() => {
    localStorage.setItem("foodOrders", JSON.stringify(foodOrders));
  }, [foodOrders]);

  // ✅ Booking Handlers
  const handleBookSeats = (newBookings) => {
    setBookedSeats((prev) => ({ ...prev, ...newBookings }));
  };

  const handleCancelSeat = (seatId) => {
    setBookedSeats((prev) => {
      const next = { ...prev };
      delete next[seatId];
      return next;
    });
    setFoodOrders((prev) => {
      const next = { ...prev };
      delete next[seatId];
      return next;
    });
  };

  const handlePlaceFoodOrder = (seatId, items) => {
    setFoodOrders((prev) => ({ ...prev, [seatId]: items }));
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="topbar">
        <h1>🎬 Movie Ticket Booking</h1>
      </header>

      {/* MAIN CONTENT */}
      <main className="container">
        {/* LEFT PANEL */}
        <aside className="leftpanel">
          <FoodOrder
            menu={menu}
            bookedSeats={bookedSeats}
            foodOrders={foodOrders}
            onPlaceOrder={handlePlaceFoodOrder}
          />
          <ReviewSection movie={selectedMovie} theatre={selectedTheatre} />
        </aside>

        {/* RIGHT PANEL (Seat Booking) */}
        <section className="mainpanel">
          <h2>🎬 {selectedMovie.title || selectedMovie.name}</h2>
          <h3>🏛 {selectedTheatre.name}</h3>
          {showTime && <p>🕒 Showtime: {showTime}</p>}

          <SeatBooking
            bookedSeats={bookedSeats}
            onBook={handleBookSeats}
            onCancel={handleCancelSeat}
            selectedMovie={selectedMovie}
            selectedTheatre={selectedTheatre}
          />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <small>
          <span style={{ color: "green" }}>□ Available</span> ·{" "}
          <span style={{ color: "orange" }}>■ Selected</span> ·{" "}
          <span style={{ color: "red" }}>✖ Booked</span> (gender shown)
        </small>
      </footer>
    </div>
  );
}

export default Main;
