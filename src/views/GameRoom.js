import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import GameParameters from "../components/GameParameters";
import ScoreBoard from '../components/ScoreBoard';
import Gameplay from '../components/Gameplay';
import InviteLinkCard from '../components/InviteLinkCard';
import WordCloud from '../components/WordCloud';
import EndDialog from '../components/EndDialog';
import TopBar from '../components/TopBar';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    margin: 15,
    padding: 20,
  },
  heading: {
    marginBottom: 10
  }
});

export default function GameRoom() {
  const classes = useStyles();
  const socketRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const [room, setRoom] = useState(null);

  useEffect(() => {

    // Creates a WebSocket connection
    socketRef.current = io('http://localhost:5000') // io('https://secure-badlands-60547.herokuapp.com'); 

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
      console.log(roomState);
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

        <Grid item xs={6}>
          {room && room.round === 0 && (
            <Card className={classes.card}>
              <InviteLinkCard room={room} />
            </Card>
          )}
        </Grid>

        <Grid item xs={6}>
          {room && room.round === 0 && socketRef.current.id === room.ownerID && (
            <Card className={classes.card}>
              <GameParameters room={room} emitStart={emitStart} />
            </Card>
          )}
        </Grid>

        <Grid item xs={12}>
          {room && (
            <Card className={classes.card}>
              <Typography variant='h6' className={classes.heading}>Scoreboard</Typography>
              <ScoreBoard room={room} playerID={socketRef.current ? socketRef.current.id : null} />
            </Card>

          )}
        </Grid>
      </Grid>
      {room && room.settings.numberOfRounds === room.round && room.inRound === false && <EndDialog room={room} emitRestart={emitRestart}/>}
    </div>
  );
}