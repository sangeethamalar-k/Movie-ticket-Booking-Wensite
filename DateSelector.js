import React from "react";


function generateNext7Days() {
  const today = new Date();
  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const options = { day: "2-digit", month: "short" };
    const formatted = date.toLocaleDateString("en-US", options).toUpperCase(); // e.g. "12 NOV"
    days.push(formatted);
  }

  return days;
}

export default function DateSelector({ selectedDate, setSelectedDate }) {
  const dates = generateNext7Days();

  return (
    <div className="date-selector">
      {dates.map((date) => (
        <button
          key={date}
          className={`date-btn ${selectedDate === date ? "active" : ""}`}
          onClick={() => setSelectedDate(date)}
        >
          {date}
        </button>
      ))}
    </div>
  );
}
