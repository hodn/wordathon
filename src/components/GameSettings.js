import React, { useState } from 'react';
import InviteLinkCard from "./InviteLinkCard";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

export default function GameSettings(props) {
    const room = props.room;
    const [roundDuration, setRoundDuration] = useState(90);
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
            <InviteLinkCard ID={room ? room.ID : ""} />
            <Select
                labelId="demo-simple-select-label"
                id="durationSelect"
                value={roundDuration}
                onChange={(event) => { setRoundDuration(event.target.value) }}
            >
                <MenuItem value={30}>30 s</MenuItem>
                <MenuItem value={60}>60 s</MenuItem>
                <MenuItem value={90}>90 s</MenuItem>
                <MenuItem value={120}>120 s</MenuItem>
            </Select>

            <Select
                labelId="demo-simple-select-label"
                id="roundSelect"
                value={numberOfRounds}
                onChange={(event) => { setNumberOfRounds(event.target.value) }}
            >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
            </Select>

            <Select
                labelId="demo-simple-select-label"
                id="roundSelect"
                value={numberOfLetters}
                onChange={(event) => { setNumberOfLetters(event.target.value) }}
            >
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={16}>16</MenuItem>
            </Select>

            <Button variant="contained" color="primary" onClick={() => startGame(roundDuration, numberOfRounds, numberOfLetters)}>
                Start game
            </Button>
        </div>
    );
}