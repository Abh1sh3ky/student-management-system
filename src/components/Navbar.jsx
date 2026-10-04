import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "./logo/studenthub-logo.png.png"
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      {/* <div className="container">

        <div className="headerLeft">
          <div className="logo">Student Management System</div>
        </div> */}




        <div className="container">

        {/* Logo */}
        <div className="headerLeft">
          <div className="logo">
            <img
              src={logo}
              alt="StudentHub Logo"
            />
          </div>
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

