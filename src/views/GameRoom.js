import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from "react-router-dom"; 
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import GameParameters from "../components/GameParameters";
import ScoreBoard from '../components/ScoreBoard';
import Gameplay from '../components/Gameplay';
import InviteLinkCard from '../components/InviteLinkCard';
import WordCloud from '../components/WordCloud';
import ColoredLinearProgress from '../components/ColoredLinearProgress';
import EndDialog from '../components/EndDialog';
import TopBar from '../components/TopBar';

// Modern styling object to replace makeStyles
const cardStyle = {
  padding: '20px',
  marginBottom: '15px',
  marginLeft: '15px',
  marginRight: '15px'
};

export default function GameRoom() {
  const socketRef = useRef();
  const location = useLocation();
  const navigate = useNavigate(); // Updated from useHistory
  
  const [room, setRoom] = useState(null);
  const [lostConnection, setLostConnection] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [disconnectReason, setDisconnectReason] = useState("");

  useEffect(() => {
    // Vite uses import.meta.env instead of process.env
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    socketRef.current = io(apiUrl); 

    // Checking for player data passed through navigation state
    if (location.state?.roomID && location.state?.playerName) {
      socketRef.current.emit("registerPlayer", location.state.playerName);
      socketRef.current.emit("joinRoom", location.state.roomID);
    } else if (location.state?.playerName) {
      socketRef.current.emit("registerPlayer", location.state.playerName);
      socketRef.current.emit("createRoom");
    } else {
      navigate("/"); // Redirect to home if no data
    }

    socketRef.current.on("updateRoom", (roomState) => {
      setRoom(roomState);
    });

    socketRef.current.on("connect", () => {
      setIsConnecting(false);
    });

    socketRef.current.on("disconnect", (reason) => {
      setDisconnectReason(reason);
      setLostConnection(true);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [location, navigate]);

  const emitStart = (settings) => {
    socketRef.current.emit("startGame", settings);
  };

  const emitRestart = () => {
    socketRef.current.emit("restartGame");
  };

  return (
    <div>
      <TopBar room={room} />

      {isConnecting && <ColoredLinearProgress />}

      {lostConnection && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          <AlertTitle>Connection lost</AlertTitle>
          <p>Error: {disconnectReason}</p>
          <p>You disconnected from the game. Re-open the game invite or refer back to the main page.</p>
        </Alert>
      )}

      <Grid container justifyContent="center" alignItems="stretch">
        <Grid item xs={12}>
          {room && room.round > 0 && (
            <Card sx={cardStyle}>
              <Gameplay room={room} socket={socketRef.current} />
            </Card>
          )}
        </Grid>

        <Grid item xs={12}>
          {room && room.round > 0 && !room.inRound && (
            <Card sx={cardStyle}>
              <WordCloud room={room} />
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {room && room.round === 0 && (
            <Card sx={cardStyle}>
              <InviteLinkCard room={room} />
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {room && (
            <Card sx={cardStyle}>
              <ScoreBoard 
                room={room} 
                playerID={socketRef.current?.id} 
                emitRestart={emitRestart} 
              />
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {room && room.round === 0 && socketRef.current?.id === room.ownerID && (
            <Card sx={cardStyle}>
              <GameParameters room={room} emitStart={emitStart} />
            </Card>
          )}
        </Grid>
      </Grid>

      {room && 
       room.settings.numberOfRounds === room.round && 
       room.inRound === false && 
       <EndDialog room={room} />}
    </div> // Fixed the missing closing div
  );
}