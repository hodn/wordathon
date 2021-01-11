import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Switch(props) {
    
    const socketRef = useRef();
    const [playerName, setPlayerName] = useState("");
    const [room, setRoom] = useState(null);

    const createGame = (playerName) => {
        socketRef.current.emit("registerPlayer", playerName);
        socketRef.current.emit("createRoom");
    };

    const joinGame = (playerName, roomID) => {
        socketRef.current.emit("registerPlayer", playerName);
        socketRef.current.emit("joinRoom", roomID);
        socketRef.current.emit("getRoomState", roomID);
    }; 

    const startGame = () => {
        socketRef.current.emit("startGame");
    }; 

    const evaluateWordEntry = (word) => {
        socketRef.current.emit("evaluateWordEntry", word);
    };

    useEffect(() => {
    
        // Creates a WebSocket connection
        socketRef.current = io("http://localhost:5000/");
        
        // Listens for incoming messages
        socketRef.current.on("initRoom", (room) => {
          setRoom(room);
        });

         // Listens for incoming messages
         socketRef.current.on("updateRoom", (room) => {
            setRoom(room);
          });
        
        // Destroys the socket reference
        // when the connection is closed
        return () => {
          socketRef.current.disconnect();
        };
      }, []);

    return (
        
        <div>
            <TextField id="outlined-basic" label="Name" variant="outlined" onChange={e => setPlayerName(e.target.value)}/>
            <Button variant="contained" color="primary">
                Join game
            </Button>
            <Button variant="contained" color="primary" onClick={createGame}>
                Create game
            </Button>
        </div>
    );
}