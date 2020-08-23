import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Sensor from './pages/Sensor';
import About from './pages/About';
import Graph from './pages/Graph';
import { Nomatch } from './pages/Nomatch';
import ErrorBoundary from './components/ErrorBoundary';
//import API from './classes/API.js';

/*
const NavbarHOC = (PassedComponent) => {
  return class extends Component {
    render() {
      return (
        <div>
          <PassedComponent {...this.props} />
        </div>
      )
    }
  }
}
*/
//const NewNavbar = NavbarHOC

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: 0,
      loggedInAs: ''
    }

    this.handleLogoutChange = this.handleLogoutChange.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
  }

  componentDidMount() {
    const lsLoggedIn = localStorage.getItem('loggedIn');
    const lsLoggedInAs = localStorage.getItem('loggedInAs');
    if (lsLoggedIn === '1') {
      console.log("We are already logged in at APP")
      this.setState({
          loggedIn: 1,
          leggedInAs: lsLoggedInAs
      })
    }        
  }

  handleLogoutChange = (value) => {
    console.log(value)
    this.setState({
      loggedIn: value
    })
    console.log("We have logged out")
  }

  handleLoginChange = (value) => {
    console.log(value)
    this.setState({
      loggedIn: value
    })
    console.log("We are logged in")
  }

  render() {
    return (
      <React.Fragment>
        <ErrorBoundary>
          <NavigationBar stateLogin={this.state.loggedIn} onLogout={this.handleLogoutChange} />
        </ErrorBoundary>
        <ErrorBoundary>
          <Login stateLogin={this.state.loggedIn} onLogin={this.handleLoginChange}/>
        </ErrorBoundary>
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => 
              <Home {...props} stateLogin={this.state.loggedIn} onLogout={this.handleLogoutChange} />} />
            <Route path="/about" render={(props) =>
              <About {...props} stateLogin={this.state.loggedIn} />} />
            <Route path="/sensor" render={(props) => 
              <Sensor {...props} stateLogin={this.state.loggedIn} onLogout={this.handleLogoutChange} />} />
            <Route path="/graph" render={(props) => 
              <Graph {...props} stateLogin={this.state.loggedIn} onLogout={this.handleLogoutChange} />} />
            <Route component={Nomatch} />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}
