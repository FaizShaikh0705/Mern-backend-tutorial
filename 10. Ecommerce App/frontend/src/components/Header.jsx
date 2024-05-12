import React, { useContext, useEffect } from 'react'
import {AuthContext} from '../contexts/AuthContext';
import {Navbar, Container, Nav, NavDropdown, Badge} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function Header() {

    const { user, updateUser } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    
    const navigate = useNavigate();

    const logoutHandler = () => {
      updateUser(null);

      navigate("/");
    };

    return (
      <header>
        <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                Urbanshop
              </Navbar.Brand>
            </LinkContainer>
  
            <Navbar.Toggle id="toggler" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              
  
              <Nav className="ml-auto" style={{ fontSize: "1rem" }}>
                <LinkContainer to="/cart">
                  <Nav.Link active>
                    <i className="fas fa-shopping-bag"></i>
                    {cart.length>0 && (<sup>
                      <Badge
                        pill
                        bg="dark"
                        style={{ backgroundColor: "black", color: "white" }}
                      >
                        {cart.length}
                      </Badge>
                    </sup>)}
                  </Nav.Link>
                </LinkContainer>
                {user ? (
                  <NavDropdown title={user.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/myorders">
                      <NavDropdown.Item>My Orders</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {user && user.role==="admin" && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
  )
}

export default Header