import React, { useState } from 'react';
// Changed useHistory to useNavigate
import { useNavigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import GameRules from '../components/GameRules';
import TopBar from '../components/TopBar';

export default function JoinPage() {
    const navigate = useNavigate(); // Updated hook
    let { roomID } = useParams();
    const [playerName, setPlayerName] = useState("");

    const redirectToGameRoom = (playerName) => {
        // In Router v6+, we pass data inside the 'state' property
        navigate('/game', {
            state: {
                playerName,
                roomID
            }
        });
    }

    return (
        <div>
            <TopBar />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
                // Updated style to sx for MUI v6 consistency
                sx={{
                    margin: 0,
                    width: '100%',
                }}
            >
                <Grid item>
                    <TextField 
                        id="nickname" 
                        label="Nickname" 
                        variant="outlined"
                        onChange={(e) => setPlayerName(e.target.value)} 
                    />
                </Grid>

                <Grid item>
                    <Button 
                        size='large' 
                        variant="contained" 
                        color="secondary" 
                        disabled={!playerName.trim()} // Prevents joining without a name
                        onClick={() => redirectToGameRoom(playerName)}
                    >
                        Join game
                    </Button>
                </Grid>

                <Grid item>
                    <GameRules />
                </Grid>
            </Grid>
        </div>
    );
}