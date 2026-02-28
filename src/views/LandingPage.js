import React, { useState } from 'react';
// Changed useHistory to useNavigate
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import GameRules from '../components/GameRules';
import TopBar from '../components/TopBar.js';

export default function LandingPage() {
    const navigate = useNavigate(); // Updated hook
    const [playerName, setPlayerName] = useState("");

    const redirectToGameRoom = (playerName) => {
        // In Router v6+, we pass data inside a 'state' property
        navigate('/game', {
            state: {
                playerName,
                roomID: null
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
                // Converted style to sx prop for MUI v6 consistency
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
                        color="primary" 
                        disabled={!playerName.trim()} // Bonus: prevent empty names
                        onClick={() => redirectToGameRoom(playerName)}
                    >
                        Create game
                    </Button>
                </Grid>

                <Grid item>
                    <GameRules />
                </Grid>
            </Grid>
        </div>
    );
}