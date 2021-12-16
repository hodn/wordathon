import React, { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GameRules from '../components/GameRules';
import TopBar from '../components/TopBar';




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
            <TopBar/>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >

                <Grid item>

                    <Typography variant="h1">
                        Wordathon
                    </Typography>
                </Grid>

                <Grid item>
                    <TextField id="nickname" label="Nickname" variant="outlined"
                        onChange={(e) => setPlayerName(e.target.value)} />
                </Grid>

                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => redirectToGameRoom(playerName)}>
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