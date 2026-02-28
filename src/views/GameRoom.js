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

const cardStyle = {
  padding: '20px',
  marginBottom: '15px',
  marginLeft: '15px',
  marginRight: '15px'
};

export default function GameRoom() {
  const socketRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [room, setRoom] = useState(null);
  const [lostConnection, setLostConnection] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [disconnectReason, setDisconnectReason] = useState("");

  // Helper to re-register the player on the server
  const reRegisterPlayer = () => {
    const savedName = sessionStorage.getItem('playerName');
    const savedRoom = sessionStorage.getItem('roomID');
    
    if (savedName && savedRoom) {
      socketRef.current.emit("registerPlayer", savedName);
      socketRef.current.emit("joinRoom", savedRoom);
    }
  };

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    // 1. Setup Socket with reconnection attempts enabled
    socketRef.current = io(apiUrl, {
      reconnectionAttempts: 5,
      timeout: 10000,
    }); 

    // 2. Persistent Identity Logic
    if (location.state?.playerName) {
      // New Join/Create: Save to storage
      sessionStorage.setItem('playerName', location.state.playerName);
      if (location.state.roomID) sessionStorage.setItem('roomID', location.state.roomID);
      
      socketRef.current.emit("registerPlayer", location.state.playerName);
      if (location.state.roomID) {
        socketRef.current.emit("joinRoom", location.state.roomID);
      } else {
        socketRef.current.emit("createRoom");
      }
    } else {
      // Potential Reconnect: Check storage
      const savedName = sessionStorage.getItem('playerName');
      const savedRoom = sessionStorage.getItem('roomID');
      
      if (savedName && savedRoom) {
        socketRef.current.emit("registerPlayer", savedName);
        socketRef.current.emit("joinRoom", savedRoom);
      } else {
        navigate("/");
      }
    }

    // 3. Socket Event Listeners
    socketRef.current.on("updateRoom", (roomState) => {
      // Capture the roomID once the room is created/joined
      if (roomState?.roomID) sessionStorage.setItem('roomID', roomState.roomID);
      setRoom(roomState);
      setLostConnection(false); // Clear error on successful update
    });

    socketRef.current.on("connect", () => {
      setIsConnecting(false);
      setLostConnection(false);
      reRegisterPlayer(); // Ensure server knows who we are after a reconnect
    });

    socketRef.current.on("disconnect", (reason) => {
      setDisconnectReason(reason);
      // Don't show "Lost Connection" immediately for "io client disconnect" 
      // which happens when we manually close it or background it.
      if (reason !== "io client disconnect") {
        setLostConnection(true);
      }
    });

    // 4. Visibility API: The "Wake Up" Call for iPhone
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (socketRef.current && !socketRef.current.connected) {
          setIsConnecting(true);
          socketRef.current.connect();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [location, navigate]);

  const emitStart = (settings) => socketRef.current.emit("startGame", settings);
  const emitRestart = () => socketRef.current.emit("restartGame");

  return (
    <div>
      <TopBar room={room} />
      {isConnecting && <ColoredLinearProgress />}

      {lostConnection && (
        <Alert severity="warning" sx={{ marginBottom: 2 }}>
          <AlertTitle>Connection unstable</AlertTitle>
          <p>Attempting to reconnect... (Reason: {disconnectReason})</p>
          <p>If you switched apps, the game will resume shortly.</p>
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
      {room && room.settings.numberOfRounds === room.round && !room.inRound && <EndDialog room={room} />}
    </div>
  );
}