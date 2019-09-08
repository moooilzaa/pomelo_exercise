import React from 'react';
import Home from './containers/home';
import Detail from './containers/detail'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

function App() {
  return (

    <div className="App">
      <Router>
        <Route path="/" exact component={Home} /> 
        <Route path="/detail/:id" component={Detail} />
      </Router>
    </div>
  );
}

export default App;
