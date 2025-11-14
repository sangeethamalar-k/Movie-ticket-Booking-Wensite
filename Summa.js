import React, { useMemo, useState } from "react";

/*
 Seat id format: RowLetter-Number e.g. A-01
 We'll render nice grid with row labels A-L and seat numbers 1..10 (two blocks to mimic aisles).
*/

const ROWS = "ABCDEFGHIJKL".split("");
const LEFT_COLUMNS = Array.from({ length: 8 }, (_, i) => i + 1);
const RIGHT_COLUMNS = Array.from({ length: 8 }, (_, i) => i + 9);

function buildSeatId(row, num) {
  return `${row}-${String(num).padStart(2, "0")}`;
}

export default function SeatBooking({ bookedSeats, onBook, onCancel, selectedMovie, selectedTheatre }) {
  const [selected, setSelected] = useState({});
  const [genderForBooking, setGenderForBooking] = useState("male");
  const maxSelectable = 20; // this is arbitrary — you can change

  // group selection count
  const selectedCount = Object.keys(selected).length;

  const seatData = useMemo(() => {
    const data = [];
    ROWS.forEach(row => {
      const left = LEFT_COLUMNS.map(n => ({ id: buildSeatId(row, n), num: n }));
      const right = RIGHT_COLUMNS.map(n => ({ id: buildSeatId(row, n), num: n }));
      data.push({ row, left, right });
    });
    return data;
  }, []);

  function toggleSeat(seatId) {
    if (bookedSeats[seatId]) return; // cannot select booked seats
    setSelected(prev => {
      const next = { ...prev };
      if (next[seatId]) delete next[seatId];
      else {
        if (Object.keys(next).length >= maxSelectable) {
          alert(`Max ${maxSelectable} seats can be selected at once.`);
          return prev;
        }
        next[seatId] = true;
      }
      return next;
    });
  }

  function confirmBooking() {
    if (Object.keys(selected).length === 0) {
      alert("Select at least one seat to book.");
      return;
    }
    // prepare booking entries
    const newBookings = {};
    Object.keys(selected).forEach(seatId => {
      newBookings[seatId] = {
        gender: genderForBooking,
        movieId: selectedMovie.id,
        theatreId: selectedTheatre.id,
        bookedAt: new Date().toISOString(),
      };
    });
    onBook(newBookings);
    setSelected({});
    alert("Seats booked successfully!");
  }

  function cancelSeat(seatId) {
    if (!bookedSeats[seatId]) return;
    if (!window.confirm(`Cancel booking for ${seatId}?`)) return;
    onCancel(seatId);
  }

  return (
    <div className="seatbooking card">
      <h2>Seats</h2>
      <div className="controls">
        <label>
          Gender for booking:
          <select value={genderForBooking} onChange={(e) => setGenderForBooking(e.target.value)}>
            <option value="male">Male ♂</option>
            <option value="female">Female ♀</option>
            <option value="other">Other ⚧</option>
          </select>
        </label>
        <div className="selected-count">Selected: {selectedCount}</div>
        <button onClick={confirmBooking} className="btn primary">Confirm Booking</button>
      </div>

      <div className="screen">SCREEN</div>

      <div className="seats-grid">
        {seatData.map(({ row, left, right }) => (
          <div className="seat-row" key={row}>
            <div className="row-label">{row}</div>

            <div className="seat-block left">
              {left.map(s => {
                const id = s.id;
                const isBooked = !!bookedSeats[id];
                const isSelected = !!selected[id];
                return (
                  <button
                    key={id}
                    className={`seat ${isBooked ? "booked" : isSelected ? "selected" : "available"}`}
                    onClick={() => (isBooked ? cancelSeat(id) : toggleSeat(id))}
                    title={isBooked ? `Booked (${bookedSeats[id].gender})` : `Seat ${id}`}
                  >
                    <div className="seat-num">{String(s.num).padStart(2, "0")}</div>
                    {isBooked && <div className={`gender-tag ${bookedSeats[id].gender}`}>{bookedSeats[id].gender[0].toUpperCase()}</div>}
                  </button>
                );
              })}
            </div>

            <div className="aisle" />

            <div className="seat-block right">
              {right.map(s => {
                const id = s.id;
                const isBooked = !!bookedSeats[id];
                const isSelected = !!selected[id];
                return (
                  <button
                    key={id}
                    className={`seat ${isBooked ? "booked" : isSelected ? "selected" : "available"}`}
                    onClick={() => (isBooked ? cancelSeat(id) : toggleSeat(id))}
                    title={isBooked ? `Booked (${bookedSeats[id].gender})` : `Seat ${id}`}
                  >
                    <div className="seat-num">{String(s.num).padStart(2, "0")}</div>
                    {isBooked && <div className={`gender-tag ${bookedSeats[id].gender}`}>{bookedSeats[id].gender[0].toUpperCase()}</div>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="legend">
        <span className="legend-item"><span className="box available small"></span> Available</span>
        <span className="legend-item"><span className="box selected small"></span> Selected</span>
        <span className="legend-item"><span className="box booked small"></span> Booked</span>
        <span className="legend-item">Click booked seat to cancel.</span>
      </div>
    </div>
  );
}
