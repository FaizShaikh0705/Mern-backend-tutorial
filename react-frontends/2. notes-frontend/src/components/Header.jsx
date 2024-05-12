import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">Notes Application</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Archived</Nav.Link>
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
  )
}

export default Header