import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TicketPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.receipt) {
    return (
      <div className="card" style={{ margin: "20px", padding: "20px" }}>
        <h2>No booking found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const { receipt } = state;
  const { movie, theatre, seats, foodOrders, bookedOn, bookingId } = receipt;

  const totalFood = Object.values(foodOrders || {}).flat().reduce((sum, items) => {
    items.forEach((it) => {
      if (it.qty && it.itemId && it.itemId.price)
        sum += it.qty * it.itemId.price;
    });
    return sum;
  }, 0);

  return (
    <div
      className="card"
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        background: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>🎟️ Ticket Receipt</h2>
      <hr />

      <p><strong>Booking ID:</strong> {bookingId}</p>
      <p><strong>Booked On:</strong> {bookedOn}</p>

      <h3 style={{ marginTop: "20px" }}>{movie.title}</h3>
      <p>{theatre.name}</p>

      <h4>Seats:</h4>
      <ul>
        {seats.map((s) => (
          <li key={s.id}>
            {s.id} — <em>{s.gender}</em>
          </li>
        ))}
      </ul>

      {foodOrders && Object.keys(foodOrders).length > 0 && (
        <>
          <h4>Food Orders:</h4>
          <ul>
            {Object.entries(foodOrders).map(([seat, items]) =>
              items.map((it, idx) => (
                <li key={idx}>
                  Seat {seat}: {it.itemId} × {it.qty}
                </li>
              ))
            )}
          </ul>
        </>
      )}

      <hr />
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <button
          className="btn btn-primary"
          onClick={() => window.print()}
          style={{ marginRight: "10px" }}
        >
          🖨️ Print / Save Ticket
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
