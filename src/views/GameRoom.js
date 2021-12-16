import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import GameParameters from "../components/GameParameters";
import ScoreBoard from '../components/ScoreBoard';
import Gameplay from '../components/Gameplay';
import Timer from '../components/Timer';
import InviteLinkCard from '../components/InviteLinkCard';
import WordCloud from '../components/WordCloud';
import Button from '@material-ui/core/Button';
import TopBar from '../components/TopBar';

export default function GameRoom() {
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
      <TopBar room={room}/>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={8}> {room && room.round === 0 && <InviteLinkCard room={room} />} </Grid>

        <Grid item xs={4}> {room && room.round === 0 && socketRef.current.id === room.ownerID && <GameParameters room={room} emitStart={emitStart} />} </Grid>

        <Grid item xs={4}> {room && <ScoreBoard room={room} playerID={socketRef.current ? socketRef.current.id : null} />} </Grid>

        <Grid item xs={8}> {room && room.round > 0 && <Gameplay room={room} socket={socketRef.current} />} </Grid>

        <Grid item xs={8}> {room && room.round > 0 && !room.inRound && <WordCloud room={room} />} </Grid>

        
        <Button onClick={emitRestart}> Restart </Button>

      </Grid>

    </div>
  );
}