import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import GameParameters from "../components/GameParameters";
import ScoreBoard from '../components/ScoreBoard';
import Gameplay from '../components/Gameplay';
import InviteLinkCard from '../components/InviteLinkCard';
import WordCloud from '../components/WordCloud';
import ColoredLinearProgress from '../components/ColoredLinearProgress';
import EndDialog from '../components/EndDialog';
import TopBar from '../components/TopBar';
import Card from '@material-ui/core/Card';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  card: {
    padding: 20,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15
  },
});

export default function GameRoom() {
  const classes = useStyles();
  const socketRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const [room, setRoom] = useState(null);
  const [lostConnection, setLostConnection] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);


  useEffect(() => {

    // Creates a WebSocket connection
    socketRef.current = io('https://secure-badlands-60547.herokuapp.com'); //io('http://localhost:5000') 

    if (location.roomID && location.playerName) {

      socketRef.current.emit("registerPlayer", location.playerName);
      socketRef.current.emit("joinRoom", location.roomID); // Player joins the room he was invited to

    } else if (location.playerName) {

      socketRef.current.emit("registerPlayer", location.playerName);
      socketRef.current.emit("createRoom"); // Player creates new room

    } else {
      history.push("/");
    }

    // Listens for incoming messages
    socketRef.current.on("updateRoom", (roomState) => {
      setRoom(roomState);
    });
    // Listens for connect 
    socketRef.current.on("connect", () => {
      setIsConnecting(false);
    });
    // Listens for disconnect 
    socketRef.current.on("disconnect", () => {
      setLostConnection(true);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const emitStart = (settings) => {
    socketRef.current.emit("startGame", settings);
  }

  const emitRestart = () => {
    socketRef.current.emit("restartGame");
  }

  return (
    <div>
      <TopBar room={room} />

      {isConnecting && <ColoredLinearProgress />}

      {lostConnection && 
      <Alert severity="error" style={{marginBottom: 15}}>
        <AlertTitle>Connection lost</AlertTitle>
        <p>You disconnected from the game. Re-open the game invite or refer back to the main page.</p>
        <p>TIP: Use SHARE INVITE on mobile devices to prevent disconnection caused by multitasking.</p>
      </Alert>}

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={12}>
          {room && room.round > 0 && (
            <Card className={classes.card}>
              <Gameplay room={room} socket={socketRef.current} />
            </Card>
          )}
        </Grid>

        <Grid item xs={12}>
          {room && room.round > 0 && !room.inRound && (
            <Card className={classes.card}>
              <WordCloud room={room} />
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {room && room.round === 0 && (
            <Card className={classes.card}>
              <InviteLinkCard room={room} />
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {room && room.round === 0 && socketRef.current.id === room.ownerID && (
            <Card className={classes.card}>
              <GameParameters room={room} emitStart={emitStart} />
            </Card>
          )}
        </Grid>

        <Grid item xs={12}>
          {room && (
            <Card className={classes.card}>
              <ScoreBoard room={room} playerID={socketRef.current ? socketRef.current.id : null} emitRestart={emitRestart} />
            </Card>

          )}
        </Grid>
      </Grid>
      {room && room.settings.numberOfRounds === room.round && room.inRound === false && <EndDialog room={room} emitRestart={emitRestart} />}
    </div>
  );
}