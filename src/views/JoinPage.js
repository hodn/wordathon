import React, { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GameRules from '../components/GameRules';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

export default function JoinPage() {

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
                    <Button size='large' variant="contained" color="secondary" onClick={() => redirectToGameRoom(playerName)}>
                        Join game
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