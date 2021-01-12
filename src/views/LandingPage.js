import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default function LandingPage() {

    const history = useHistory();
    const [playerName, setPlayerName] = useState("");
    
    const redirectToGameRoom = (playerName) => {
        history.push({
            pathname: '/game',
            playerName,
            roomdID: null
          });
    }

    return (
        <div>
            <TextField id="nickname" label="Nickname" variant="outlined"
                onChange={(e) => setPlayerName(e.target.value)} />

            <Button variant="contained" color="primary" onClick={() => redirectToGameRoom(playerName)}>
                Create game
            </Button>
        </div>
    );
}