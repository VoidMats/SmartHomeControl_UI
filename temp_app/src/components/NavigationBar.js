
import React, { Component } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
///import { Link } from 'react-router-dom'
import styled from 'styled-components';

const NavbarStyle = styled.div`
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

export default class NavigationBar extends Component {
    
    constructor(props) {
        super(props);

        this.mounted = false;
        this.state = {
            loggedIn: 0
        }

        this.handleLogout = this.handleLogout.bind(this)
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        //this.setState({
        //    loggedIn: 0
        //})
    }

    componentDidUpdate(prevProps, prevState) {
        // Can't update with undefined props
        if (this.props !== undefined) {
            if (this.props.stateLogin !== prevProps.stateLogin) {
                console.log("We gona update Navbar UI here")
                console.log(this.props)
                this.setState({
                    loggedIn: this.props.stateLogin
                })
            }
        }
    }

    handleLogout(event) {
        localStorage.clear('loggedIn');
        localStorage.clear('loggedInAs');
        this.props.onLogout(0)
        event.preventDefault();
    }
    
    render() {
        return ( 
            <NavbarStyle>
                <Navbar expand="lg">
                    <Navbar.Brand href="/">Home Temperature control</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link> 
                        <Nav.Link href="/Sensor">Sensor</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    <Button 
                        variant="outline-primary" 
                        className="pull-right"
                        onClick={this.handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Navbar>
            </NavbarStyle>
        )
    }
}

/*
<Nav.Link href="/">Home</Nav.Link> 
<Nav.Link href="/Sensor">Sensor</Nav.Link>
<Nav.Link href="/about">About</Nav.Link>


<NavItem componentClass={Link} 
            href='/' 
            active={ === '/'}>Home</NavItem>
<NavItem componentClass={Link} 
            href='/sensor' 
            active={location.pathname === '/dogs'}>Sensor</NavItem>
<NavItem componentClass={Link} 
            href='/about' 
            active={location.pathname === '/about'}>About</NavItem>
*/


