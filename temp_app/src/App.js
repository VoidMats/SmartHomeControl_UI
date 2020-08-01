import React from 'react';
import logo from './logo.svg';
import './App.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import Sidebar from './components/Sidebar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Nomatch } from './pages/Nomatch';

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />

        <Sidebar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route component={Nomatch} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
