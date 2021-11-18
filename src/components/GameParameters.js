import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';



export default function GameParameters(props) {
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
            <Card>

                <FormControl>
                    <InputLabel>Rounds</InputLabel>
                    <Select
                        id="roundSelect"
                        value={numberOfRounds}
                        onChange={(event) => { setNumberOfRounds(event.target.value) }}
                    >
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Round time</InputLabel>
                    <Select
                        id="durationSelect"
                        value={roundDuration}
                        onChange={(event) => { setRoundDuration(event.target.value) }}
                    >
                        <MenuItem value={30}>30 s</MenuItem>
                        <MenuItem value={60}>60 s</MenuItem>
                        <MenuItem value={90}>90 s</MenuItem>
                        <MenuItem value={120}>120 s</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Difficulty</InputLabel>
                    <Select
                        id="roundSelect"
                        value={numberOfLetters}
                        label='Number of letters'

                        onChange={(event) => { setNumberOfLetters(event.target.value) }}
                    >
                        <MenuItem value={8}>Hard</MenuItem>
                        <MenuItem value={12}>Normal</MenuItem>
                        <MenuItem value={16}>Easy</MenuItem>
                    </Select>
                </FormControl>



                <Button variant="contained" color="primary" onClick={() => startGame(roundDuration, numberOfRounds, numberOfLetters)}>
                    Start game
                </Button>

            </Card>
        </div>
    );
}