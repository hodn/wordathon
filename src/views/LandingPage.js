import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GameRules from '../components/GameRules';
import TopBar from '../components/TopBar.js';
import Footer from '../components/Footer';


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
            <TopBar />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
                style={{
                    margin: 0,
                    width: '100%',
                  }}
            >

                <Grid item>
                    <TextField id="nickname" label="Nickname" variant="outlined"
                        onChange={(e) => setPlayerName(e.target.value)} />
                </Grid>

                <Grid item>
                    <Button size='large' variant="contained" color="primary" onClick={() => redirectToGameRoom(playerName)}>
                        Create game
                    </Button>
                </Grid>

                <Grid item>
                    <GameRules />
                </Grid>

            </Grid>
            <Footer/>
        </div>
    );
}