
import Header from "./Header";
import React, { useState, useEffect } from "react";
import DateSelector from "./DateSelector";
import TheatreList from "./TheatreList";
import { useLocation } from "react-router-dom";
import "./theatrelist.css";

function TheatreMain() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Chennai");

  const location = useLocation();
  const { movie } = location.state || {};
  useEffect(() => {
    const today = new Date();
    const options = { day: "2-digit", month: "short" }; // e.g. "12 Nov"
    const formatted = today
      .toLocaleDateString("en-US", options)
      .toUpperCase(); // "12 NOV"
    setSelectedDate(formatted);
  }, []);


  return (
    <div className="app">
      <Header
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TheatreList
        selectedDate={selectedDate}
        selectedLocation={selectedLocation}
        selectedMovie={movie}
      />
    </div>
  );
}

export default TheatreMain;
