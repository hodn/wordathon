import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Timer from '../components/Timer';
import {Link} from "react-router-dom";

export default function TopBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginBottom: 30 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{cursor:'default', color: 'white', textDecoration: 'none', flex: 1}}><Typography variant="h4"> Wordathon </Typography></Link>
          <Timer room={props.room} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}