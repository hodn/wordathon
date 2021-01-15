import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch as RouterSwitch,
  Route
} from "react-router-dom";

import GameRoom from './views/GameRoom';
import LandingPage from './views/LandingPage';
import JoinPage from './views/JoinPage';

function App() {

  return (

    <div>
      <Router>
        <RouterSwitch>
          <Route path="/join/:roomID" component={JoinPage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/game/" component={GameRoom} />
        </RouterSwitch>
      </Router>
    </div>

  );
}

export default App;
