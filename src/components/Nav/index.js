import React from "react";
import { Link } from "react-router-dom";
import "./nav.module.css";
import Button from "@material-ui/core/Button";


const Nav = ({ user, handleLogout }) => {

  return (
    <div className={"nav-row"}>
      <div className={"nav-links-list"}>
        <div className={"home-button"}>
          <Link to="/">Home</Link>
        </div>
        {!user && (
          <div >
            <Link to="/sign-up">Sign Up</Link>
          </div>
        )}
        {!user && (
          <li>
            <Link to="/log-in">Log In</Link>
          </li>
        )}
      </div>
      {user && (
        <Button className={"logout-button"} onClick={handleLogout} variant="contained" color="primary">
          Log Out
        </Button>
      )}
    </div>
  );
};

export default Nav;