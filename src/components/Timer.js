import React, { useState, useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';

export default function Timer(props) {
    const room = useRef();
    room.current = props.room;
    const [remainingSecs, setRemainingSecs] = useState(null);
    const audioStart = new Audio('https://audio.code.org/goal1.mp3');
    const audioEnd= new Audio('https://audio.code.org/losepoint2.mp3');

    const getGameState = (room) => {

        if (!room) return 4; // not in the game enivronment - room
        if (room.round === 0) return 0; // Game to be started
        if (room.inRound) return 1; // Time remains
        if (!room.inRound && room.round === room.settings.numberOfRounds) {
            return 3; // end of the game
        } else {
            return 2; // Next round in
        }
    }

    const calculateSeconds = (room) => {
        const gameState = getGameState(room);
        let millis = null;

        if (gameState === 1) {
            millis = room.roundEndTime - Date.now();
        }
        if (gameState === 2) {
            millis = room.roundNextStart - Date.now();
        }

        if (!millis) {
            setRemainingSecs(null);
        } else {
            const time = (millis / 1000).toFixed(0);
            setRemainingSecs(time);

            if (time === '1' && room.inRound) audioEnd.play();
            if (time === (room.settings.roundDuration - 1).toString() && room.inRound) audioStart.play();
        }

    }

    const getText = (gameState) => {

        switch (gameState) {
            case 1:
                return "Time left: ";
            case 2:
                return "Next round in: ";
            case 3:
                return "Game has ended"
            case 4:
                return (<Typography>Made by <a href="https://github.com/hodn">hodn</a></Typography>)
            default:
                return "Game to be started";
        }

    }

    useEffect(() => {
        const timer = setInterval(() => {
            calculateSeconds(room.current);
        }, 1000)

        return () => clearInterval(timer);
    }, []);

    return (

        <div>
            <Typography variant='body1'> {getText(getGameState(room.current))} {remainingSecs > 0 ? remainingSecs : ""} </Typography>
        </div>
    );
}