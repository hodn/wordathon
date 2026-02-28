import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Routes, // Replaces Switch
  Route
} from "react-router-dom";

// Updated imports for MUI v6
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Recommended for consistent MUI styles

import GameRoom from './views/GameRoom';
import LandingPage from './views/LandingPage';
import JoinPage from './views/JoinPage';

// createMuiTheme is now createTheme
const theme = createTheme({
  palette: {
    mode: 'light', // 'type' is now 'mode'
    primary: {
      main: '#00838f',
    },
    secondary: {
      main: '#ff3d00',
    },
  },
  typography: {
    fontFamily: [
      'Futura',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kicks in standard MUI resets */}
      <CssBaseline /> 
      
      {/* Vite handles the base path automatically, no need for process.env.PUBLIC_URL */}
      <Router>
        <Routes>
          {/* v6 uses 'element' prop with JSX syntax instead of 'component' */}
          <Route path="/join/:roomID" element={<JoinPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<GameRoom />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;