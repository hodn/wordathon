import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Removed makeStyles import to kill the @mui/styles dependency

export default function GameParameters(props) {
    // Define styles as a plain object for the sx prop
    const styles = {
        input: {
            minWidth: 120, // Slightly increased for better label visibility in v6
            margin: '5px',
        },
        heading: {
            marginBottom: '10px'
        }
    };

    const [roundDuration, setRoundDuration] = useState(60);
    const [numberOfRounds, setNumberOfRounds] = useState(5);
    const [numberOfLetters, setNumberOfLetters] = useState(12);

    const startGame = (roundDuration, numberOfRounds, numberOfLetters) => {
        const settings = {
            roundDuration,
            numberOfRounds,
            numberOfLetters
        }
        props.emitStart(settings);
    }

    return (
        <div>
            {/* Swapped className for sx prop */}
            <Typography variant='h5' sx={styles.heading}>
                Game settings
            </Typography>

            <Grid
                container
                direction="column"
                spacing={2}
            >
                <Grid item>
                    <FormControl sx={styles.input}>
                        <InputLabel id="round-label">Rounds</InputLabel>
                        <Select
                            labelId="round-label"
                            id="roundSelect"
                            value={numberOfRounds}
                            label="Rounds" // Required in v6 for the label to float correctly
                            onChange={(event) => { setNumberOfRounds(event.target.value) }}
                        >
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={styles.input}>
                        <InputLabel id="duration-label">Round time</InputLabel>
                        <Select
                            labelId="duration-label"
                            id="durationSelect"
                            value={roundDuration}
                            label="Round time"
                            onChange={(event) => { setRoundDuration(event.target.value) }}
                        >
                            <MenuItem value={30}>30 s</MenuItem>
                            <MenuItem value={60}>60 s</MenuItem>
                            <MenuItem value={90}>90 s</MenuItem>
                            <MenuItem value={120}>120 s</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={styles.input}>
                        <InputLabel id="difficulty-label">Difficulty</InputLabel>
                        <Select
                            labelId="difficulty-label"
                            id="difficultySelect"
                            value={numberOfLetters}
                            label='Difficulty'
                            onChange={(event) => { setNumberOfLetters(event.target.value) }}
                        >
                            <MenuItem value={8}>Hard</MenuItem>
                            <MenuItem value={12}>Normal</MenuItem>
                            <MenuItem value={16}>Easy</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => startGame(roundDuration, numberOfRounds, numberOfLetters)}
                    >
                        Start game
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}