import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Timer from '../components/Timer';

export default function TopBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }} style={{marginBottom: 10}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" style={{ flex: 1 }}> Wordathon </Typography>
          <Timer room={props.room} /> 
        </Toolbar>
      </AppBar>
    </Box>
  );
}