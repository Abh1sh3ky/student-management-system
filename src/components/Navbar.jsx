import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="container">

        <div className="headerLeft">
          <div className="logo">StudentHub</div>
        </div>

        {/* Hamburger button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`headerRight ${menuOpen ? "showMenu" : ""}`}>
          <nav>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/students" onClick={closeMenu}>
              Students
            </NavLink>

            <NavLink to="/addstudent" onClick={closeMenu}>
              Add Student
            </NavLink>
          </nav>
        </div>

      </div>
    </header>
  );
};

export default Navbar;