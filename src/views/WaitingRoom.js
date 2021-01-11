import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function WaitingRoom() {
    const socketRef = useRef();

    const [room, setRoom] = useState(null); 

    useEffect(() => {
    
        // Creates a WebSocket connection
        socketRef.current = io("http://localhost:5000/");
        socketRef.current.emit("getRoomState");
        
        // Listens for incoming messages
        socketRef.current.on("updateRoom", (roomState) => {
          setRoom(roomState);
          console.log(room);
        });
        
        // Destroys the socket reference
        // when the connection is closed
        return () => {
          socketRef.current.disconnect();
        };
      }, []);

    return (
        
        <div>
            Waiting Room
        </div>
    );
}