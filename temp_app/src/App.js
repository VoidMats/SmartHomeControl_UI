import React from 'react';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Sensor from './pages/Sensor';
import { About } from './pages/About';
import { Nomatch } from './pages/Nomatch';
import API from './classes/API.js';

export default function App() {

  const api = new API()

  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <Login api={api}/>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/sensor" component={Sensor} />
          <Route component={Nomatch} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
