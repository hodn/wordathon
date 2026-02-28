import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

// This replaces the const styles and withStyles wrapper
const CustomizedProgress = styled(LinearProgress)(({ theme }) => ({
  backgroundColor: 'grey',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#ff3d00',
  },
}));

const ColoredLinearProgress = (props) => {
  return <CustomizedProgress {...props} />;
};

export default ColoredLinearProgress;