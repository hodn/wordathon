import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import GameParameters from "../components/GameParameters";
import ScoreBoard from '../components/ScoreBoard';
import Gameplay from '../components/Gameplay';
import InviteLinkCard from '../components/InviteLinkCard';
import WordCloud from '../components/WordCloud';
import Button from '@material-ui/core/Button';
import TopBar from '../components/TopBar';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




const useStyles = makeStyles({
    card: {
        margin: 10,
        padding: 10,
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

  const getBestPlayer = (room) => {
    const list = [];

    for (const playerID in room.players) {
      list.push(room.players[playerID]);
    }

    list.sort((a, b) => b.points - a.points);

    return list[0];

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

      <Dialog
        open={room && room.settings.numberOfRounds === room.round && room.inRound === false}
      >
        <DialogTitle id="alert-dialog-title">
          Congratulations
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {room ? getBestPlayer(room).name : 'N/A'} won with {room? getBestPlayer(room).points : 'N/A'} points!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={emitRestart} autoFocus>
            Restart game
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}