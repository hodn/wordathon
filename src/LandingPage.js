import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function LandingPage() {
    
    const [playerName, setPlayerName] = useState("");
    const socketRef = useRef();

    const sendHello = () => {socketRef.current.emit("hello", "hello")};

    useEffect(() => {
    
        // Creates a WebSocket connection
        socketRef.current = io("http://localhost:5000/");
        
        // Listens for incoming messages
        socketRef.current.on("papa", (message) => {
          console.log(message);
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
            <Button variant="contained" color="primary" onClick={sendHello}>
                Create game
            </Button>
        </div>
    );
}