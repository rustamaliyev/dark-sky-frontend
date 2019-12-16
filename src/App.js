import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Lookup from './components/Lookup';
import PastLookups from './components/PastLookups';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
class App extends Component {
  render() {
    return (
    <Router>
  

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
            <Link to={'/'} className="nav-link"> Home </Link>
            </li>
            <li class="nav-item">
            <Link to={'/lookup'} className="nav-link">Lookup Weather</Link>
            </li>
            <li class="nav-item">
            <Link to={'/past-lookups'} className="nav-link">Past Lookups</Link>
            </li>
          </ul>
        </div>
      </nav>
        
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/lookup' component={Lookup} />
              <Route path='/past-lookups' component={PastLookups} />
          </Switch>
        
      </Router>
    );
  }
}

export default App;