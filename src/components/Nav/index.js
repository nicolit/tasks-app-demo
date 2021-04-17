import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import Button from "@material-ui/core/Button";


const Nav = ({ user, handleLogout }) => {

  return (
    <div className={styles.navRow}>
      <div className={styles.navLinksList}>
        <li className={styles.linkButton}>
          <Link to="/">Home</Link>
        </li>
        {!user && (
          <li className={styles.linkButton}>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        )}
        {!user && (
          <li className={styles.linkButton}>
            <Link to="/log-in">Log In</Link>
          </li>
        )}
      </div>
      {user && (
        <Button className={styles.logoutButton} onClick={handleLogout} variant="contained" color="primary">
          Log Out
        </Button>
      )}
    </div>
  );
};

export default Nav;