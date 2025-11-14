import React, { useMemo, useState, useRef } from "react";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ROWS = "ABCDEFGHIJKL".split("");
const LEFT_COLUMNS = Array.from({ length: 7 }, (_, i) => i + 1);
const RIGHT_COLUMNS = Array.from({ length: 7 }, (_, i) => i + 8);

function buildSeatId(row, num) {
  return `${row}-${String(num).padStart(2, "0")}`;
}

function generateBookingId() {
  return Math.floor(100000 + Math.random() * 900000);
}

export default function SeatBooking({ selectedMovie, selectedTheatre }) {
  const [bookedSeats, setBookedSeats] = useState(() => {
    const saved = localStorage.getItem("bookedSeats");
    return saved ? JSON.parse(saved) : {};
  });

  const [selected, setSelected] = useState({});
  const [genderForBooking, setGenderForBooking] = useState("male");
  const [receipts, setReceipts] = useState([]);
  const maxSelectable = 6;
  const selectedCount = Object.keys(selected).length;

  const receiptRefs = useRef({});

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
    if (bookedSeats[seatId]) return;
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

    const bookingId = generateBookingId();
    const newBookings = {};
    Object.keys(selected).forEach(seatId => {
      newBookings[seatId] = {
        gender: genderForBooking,
        movieId: selectedMovie.id,
        theatreId: selectedTheatre.id,
        bookedAt: new Date().toISOString(),
        bookingId,
      };
    });

    const updatedBookedSeats = { ...bookedSeats, ...newBookings };
    setBookedSeats(updatedBookedSeats);
    localStorage.setItem("bookedSeats", JSON.stringify(updatedBookedSeats));
    setSelected({});

    const newReceipt = {
      bookingId,
      seats: Object.keys(selected),
      gender: genderForBooking,
      movie: selectedMovie.title,
      theatre: selectedTheatre.name,
      date: new Date().toLocaleString(),
    };
    setReceipts(prev => [...prev, newReceipt]);
    alert(`Seats booked successfully! Your Booking ID: ${bookingId}`);
  }

  function cancelSeat(seatId) {
    if (!bookedSeats[seatId]) return;
    if (!window.confirm(`Cancel booking for ${seatId}?`)) return;

    const updatedBookedSeats = { ...bookedSeats };
    delete updatedBookedSeats[seatId];
    setBookedSeats(updatedBookedSeats);
    localStorage.setItem("bookedSeats", JSON.stringify(updatedBookedSeats));
  }

  // Download receipt as PDF
  const downloadReceipt = async (bookingId) => {
    const element = receiptRefs.current[bookingId];
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`receipt_${bookingId}.pdf`);
  };

  return (
    <div className="seatbooking card">
      <h2>{selectedMovie.title} — Seats</h2>
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
        <button onClick={confirmBooking} className="btn btn-dark">Confirm Booking</button>
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
                    className={`seat ${isBooked ? bookedSeats[id].gender : isSelected ? "selected" : "available"}`}
                    onClick={() => (isBooked ? cancelSeat(id) : toggleSeat(id))}
                    title={isBooked ? `Booked (${bookedSeats[id].gender})` : `Seat ${id}`}
                  >
                    <div className="seat-num">{String(s.num).padStart(2, "0")}</div>
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
                    className={`seat ${isBooked ? bookedSeats[id].gender : isSelected ? "selected" : "available"}`}
                    onClick={() => (isBooked ? cancelSeat(id) : toggleSeat(id))}
                    title={isBooked ? `Booked (${bookedSeats[id].gender})` : `Seat ${id}`}
                  >
                    <div className="seat-num">{String(s.num).padStart(2, "0")}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Receipt Section */}
      <div className="receipts">
        <h3>Booking Receipts</h3>
        {receipts.map(r => (
          <div key={r.bookingId} className="receipt-card" ref={el => receiptRefs.current[r.bookingId] = el}>
            <strong>Booking ID:</strong> {r.bookingId}<br/>
            <strong>Movie:</strong> {r.movie}<br/>
            <strong>Theatre:</strong> {r.theatre}<br/>
            <strong>Date:</strong> {r.date}<br/>
            <strong>Gender:</strong> {r.gender}<br/>
            <strong>Seats:</strong> {r.seats.join(", ")}<br/>
            <div style={{ marginTop: "10px" }}>
              <QRCode value={`BookingID:${r.bookingId}|Movie:${r.movie}|Theatre:${r.theatre}|Seats:${r.seats.join(",")}`} size={100} />
            </div>
            <button onClick={() => downloadReceipt(r.bookingId)} style={{ marginTop: "10px" }}>Download Receipt</button>
          </div>
        ))}
      </div>

      <style>{`
        .seat { width: 40px; height: 40px; margin: 2px; border-radius: 5px; border: 1px solid #444; position: relative; cursor: pointer; }
        .seat.available { background-color: #eee; }
        .seat.selected { background-color: #ffa500; }
        .seat.male { background-color: #4a90e2; color: #fff; }
        .seat.female { background-color: #ff69b4; color: #fff; }
        .seat.other { background-color: #aaa; color: #fff; }
        .seat-num { font-size: 12px; position: absolute; top: 4px; left: 4px; }
        .seat-row { display: flex; align-items: center; margin-bottom: 5px; }
        .row-label { width: 20px; }
        .seat-block { display: flex; }
        .aisle { width: 20px; }
        .legend { margin-top: 10px; }
        .legend-item { margin-right: 15px; }
        .legend .box { display: inline-block; width: 20px; height: 20px; margin-right: 5px; vertical-align: middle; }
        .legend .box.available { background-color: #eee; border: 1px solid #444; }
        .legend .box.selected { background-color: #ffa500; }
        .legend .box.male { background-color: #4a90e2; }
        .legend .box.female { background-color: #ff69b4; }
        .legend .box.other { background-color: #aaa; }
        .receipts { margin-top: 20px; }
        .receipt-card { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px; background: #f9f9f9; }
        button { cursor: pointer; }
      `}</style>
    </div>
  );
}
