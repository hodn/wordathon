import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useHistory } from "react-router-dom";

import GameSetUp from "../components/GameSetUp";
import ScoreBoard from '../components/ScoreBoard';
import Gameplay from '../components/Gameplay';
import Timer from '../components/Timer';


export default function GameRoom() {
  const socketRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const [room, setRoom] = useState(null);

  useEffect(() => {

    // Creates a WebSocket connection
    socketRef.current = io("localhost:5000");

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

  return (

    <div>
      {room && room.round === 0 && <GameSetUp room={room} emitStart={emitStart} isOwner={socketRef.current.id === room.ownerID}/>}
      <ScoreBoard room={room} playerID={socketRef.current ? socketRef.current.id : null}/>
      {room && room.round > 0 && <Gameplay room={room} socket={socketRef.current} />}
      {room && <Timer room={room}/>}
    </div>
  );
}