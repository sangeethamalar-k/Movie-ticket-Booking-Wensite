import React, { Fragment } from "react";
import "./Header.css";
import logo from "./assets/theatrelogo.png"

const Header = ({ selectedLocation, setSelectedLocation }) => {
  const locations = ["Chennai", "Madurai", "Salem"];

  return (
    <Fragment>
      <div className="header d-flex align-items-center justify-content-between p-3 ">
        <img
          src={logo}
          alt="Logo"
          style={{ height: "50px", width:"160px",backgroundColor:"black" }}
        />
       <h1>Enjoy Your movie here! With our Happiness.....</h1>
        {/* Location dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedLocation}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {locations.map((loc) => (
              <li key={loc}>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => setSelectedLocation(loc)}
                >
                  {loc}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
