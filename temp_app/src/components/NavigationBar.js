
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar { background-color: #8cc3a8; }
    a, .navbar-nav, .navbar-light .nav-link {
        color: #4a7f65;
        &:hover { color: #42554b; }
    }
    .navbar-brand {
        font-size: 1.4em;
        color: #4a7f65;
        &:hover { color: #42554b; }
    }
    .form-center {
        position: absolute !important;
        left: 25%;
        right: 25%;
    }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
        <Navbar.Brand href="/">Home Temperature control</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link> 
            <Nav.Link href="/Sensor">Sensor</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        </Navbar.Collapse>
        
    </Navbar>
  </Styles>
)