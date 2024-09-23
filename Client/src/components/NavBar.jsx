import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Academic Tracker
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/classes" className="nav-links">
              קורסים
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tasks" className="nav-links">
              משימות
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tests" className="nav-links">
              מבחנים
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/scores" className="nav-links">
              ציונים
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
