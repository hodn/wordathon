import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" component="div" > Wordathon </Typography>
          <Typography variant="h6" component="div" style={{ marginLeft: 'auto' }}> Let's have fun! </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}