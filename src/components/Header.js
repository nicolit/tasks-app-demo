import React from "react";
import { Navbar } from "react-bootstrap";

const TITLE = 'Kanban Board';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">{TITLE}</Navbar.Brand>
    </Navbar>
  );
}

export default Header;
