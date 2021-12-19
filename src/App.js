import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch as RouterSwitch,
  Route
} from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import GameRoom from './views/GameRoom';
import LandingPage from './views/LandingPage';
import JoinPage from './views/JoinPage';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#ff3d00',
    },
  },
});

function App() {

  return (

    <div>
      <MuiThemeProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL}>
          <RouterSwitch>
            <Route path="/join/:roomID" component={JoinPage} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/game/" component={GameRoom} />
          </RouterSwitch>
        </Router>
      </MuiThemeProvider>
    </div>

  );
}

export default App;
