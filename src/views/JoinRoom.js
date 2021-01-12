import React, { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default function JoinRoom() {

    const history = useHistory();
    let { roomID } = useParams();
    const [playerName, setPlayerName] = useState("");
    
    const redirectToGameRoom = (playerName) => {
        history.push({
            pathname: '/game',
            playerName,
            roomID
          });
    }

    return (
        <div>
            <TextField id="nickname" label="Nickname" variant="outlined"
                onChange={(e) => setPlayerName(e.target.value)} />

            <Button variant="contained" color="primary" onClick={() => redirectToGameRoom(playerName)}>
                Join game
            </Button>
        </div>
    );
}