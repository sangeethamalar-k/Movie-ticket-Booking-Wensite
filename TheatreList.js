import React, { useEffect, useState } from "react";
import TheatreCard from "./TheatreCard";

export default function TheatreList({ selectedDate, selectedLocation, selectedMovie }) {
  // Auto detect today's date in "DD MMM" format
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { day: "2-digit", month: "short" };
    const formatted = today.toLocaleDateString("en-US", options).toUpperCase();
    setTodayDate(formatted);
  }, []);

  // Your theatre data
  const theatreData = {
    Chennai: {
      [todayDate]: [
        {
          name: "The Vijay Park Multiplex: Injambakkam ECR 4K Atmos",
          shows: ["03:00 PM", "06:30 PM", "10:00 PM"],
          cancellable: true,
        },
        {
          name: "Rohini Silver Screens: Koyambedu",
          shows: ["12:50 PM", "03:40 PM", "06:30 PM"],
          cancellable: false,
        },
        {
          name: "WebKitCSSMatrix(Krishna cinemas) RG3 LASER DOLBYATMOS TNagar",
          shows: ["10:30 AM","03:00 PM", "06:30 PM", "10:00 PM"],
          cancellable: true,
        },
        {
          name: "Rohini Silver Screens: Koyambedu",
          shows: ["12:50 PM", "12:50 PM","03:40 PM", "06:30 PM", "10:00 PM"],
          cancellable: false,
        },
        {
          name: "AGS Cinemas Maduravoyal",
          shows: ["03:00 PM", "06:30 PM", "10:00 PM"],
          cancellable: true,
        },
        {
          name: "INOX Screens: Koyambedu",
          shows: ["12:50 PM", "03:40 PM", "06:30 PM"],
          cancellable: false,
        },
      ],
      "13 NOV": [
        {
          name: "PVR VR Chennai",
          shows: ["01:00 PM", "04:00 PM", "07:30 PM"],
          cancellable: true,
        },
        {
          name: "The Vijay Park Multiplex: Injambakkam ECR 4K Atmos",
          shows: ["03:00 PM", "06:30 PM", "10:00 PM"],
          cancellable: true,
        },
        {
          name: "Rohini Silver Screens: Koyambedu",
          shows: ["12:50 PM", "03:40 PM", "06:30 PM"],
          cancellable: false,
        },
        {
          name: "WebKitCSSMatrix(Krishna cinemas) RG3 LASER DOLBYATMOS TNagar",
          shows: ["10:30 AM","03:00 PM", "06:30 PM", "10:00 PM"],
          cancellable: true,
        },
        {
          name: "Rohini Silver Screens: Koyambedu",
          shows: ["12:50 PM", "12:50 PM","03:40 PM", "06:30 PM", "10:00 PM"],
          cancellable: false,
        }
      ],
    },

    Madurai: {
      [todayDate]: [
        {
          name: "The Cinemas Madurai Mall",
          shows: ["10:00 AM", "01:30 PM", "07:00 PM"],
          cancellable: true,
        },
        {
          name: "INOX Madurai Vishaal De Mall",
          shows: ["02:00 PM", "06:30 PM"],
          cancellable: false,
        },
        {
          name: "The Vijay Park Multiplex: Madurai",
          shows: ["03:00 PM", "06:30 PM", "10:00 PM"],
          cancellable: true,
        },
        {
          name: "RRR Silver Screens: Periyar Madurai",
          shows: ["12:50 PM", "03:40 PM", "06:30 PM"],
          cancellable: false,
        },
        {
          name: "Malar Cinemas,Anna Nagar MAdurai",
          shows: ["10:30 AM","03:00 PM", "06:30 PM", "10:00 PM"],
          cancellable: true,
        },
        {
          name: "Geetha Screen,Arappalaiyam Madurai",
          shows: ["12:50 PM", "12:50 PM","03:40 PM", "06:30 PM", "10:00 PM"],
          cancellable: false,
        },
        {
          name: "AGS Cinemas Madurai",
          shows: ["03:00 PM", "06:30 PM", "10:00 PM"],
          cancellable: true,
        },
        {
          name: "INOX Screens: Mattuthavani",
          shows: ["12:50 PM", "03:40 PM", "06:30 PM"],
          cancellable: false,
        },
      ],
    },

    Salem: {
      [todayDate]: [
        {
          name: "ARRS Multiplex Salem",
          shows: ["11:00 AM", "02:00 PM", "08:00 PM"],
          cancellable: true,
        },
        {
          name: "Sona Cinemas",
          shows: ["03:30 PM", "09:00 PM"],
          cancellable: false,
        },
        {
          name: "Vettri Theatre ,Salem",
          shows: ["03:00 PM", "06:30 PM", "10:00 PM"],
          cancellable: true,
        },
        {
          name: "Ravi Silver Screens: Kovilpalaiyam Salem",
          shows: ["12:50 PM", "03:40 PM", "06:30 PM"],
          cancellable: false,
        },
        {
          name: "Krishna cinemas RG3 LASER DOLBYATMOS NNN Nagar Salem",
          shows: ["10:30 AM","03:00 PM", "06:30 PM", "10:00 PM"],
          cancellable: true,
        },
        {
          name: "Rohini Silver Screens: Koyambedu",
          shows: ["12:50 PM", "12:50 PM","03:40 PM", "06:30 PM", "10:00 PM"],
          cancellable: false,
        },
        {
          name: "AGS Cinemas Salem",
          shows: ["03:00 PM", "06:30 PM", "10:00 PM"],
          cancellable: true,
        },
        {
          name: "INOX Screens: Kovil Nagar ,Salem",
          shows: ["12:50 PM", "03:40 PM", "06:30 PM"],
          cancellable: false,
        },
      ],
    },
  };

  // Get theatre list for selected date/location
  const theatres =
    theatreData[selectedLocation]?.[selectedDate] ||
    theatreData[selectedLocation]?.[todayDate] ||
    [];

  return (
    <div className="theatre-list">
      <h2>
        Theatres in{" "}
        <span style={{ color: "#ff2e63" }}>{selectedLocation}</span> •{" "}
        {selectedDate || todayDate}
      </h2>

      {theatres.length > 0 ? (
        theatres.map((t, i) => (
          <TheatreCard key={i} theatre={t} selectedMovie={selectedMovie} />
        ))
      ) : (
        <p>No shows available for this date and location.</p>
      )}
    </div>
  );
}