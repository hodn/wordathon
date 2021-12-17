import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
    chip: {
        color: 'white',
        marginRight: 3,
    },
    letterButton: {
        marginRight: 4,
        marginTop: 4
    },
    text: {
        marginBottom: 10,
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,

    }
});

export default function Gameplay(props) {
    const classes = useStyles();
    const room = props.room;
    const socket = props.socket;
    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState(null);
    const [evaluations, setEvaluations] = useState([]);
    const [pressedLetters, setPressedLetters] = useState([]);

    useEffect(() => {
        socket.on("evaluationReply", (reply) => {
            setDefinition(reply.definitions ? reply.definitions[0] : "");
            setTimeout(() => setDefinition(null), 3000);
            setEvaluations(evaluations => [...evaluations, reply]);
        });

    }, []);

    useEffect(() => {
        if (!room.inRound) setEvaluations([]);

    }, [room]);

    const addLetter = (index) => {
        setWord(`${word}${room.roundLetters[index]}`);
        setPressedLetters(pressedLetters => [...pressedLetters, index]);
    }

    const resetInput = () => {
        setWord("");
        setPressedLetters([]);
    }

    const submitWord = (word) => {
        socket.emit("evaluateWordEntry", word);
        resetInput();
    }

    const getChipColor = (result) => {
        switch (result) {
            case 1:
                return "yellow";
            case 2:
                return "green";
            default:
                return "red";
        }
    }

    return (

        <div>
            <Typography className={classes.text} variant="h1"> {word ? word : "___"} </Typography>

            {room.roundLetters.map((letter, index) => {
                return (
                    <Button
                        className={classes.letterButton}
                        variant="contained"
                        key={index} disabled={pressedLetters.includes(index)} onClick={() => addLetter(index)}>{letter}
                    </Button>)
            })}

            <br />

            <Button disabled={word.length < 3 || !room.inRound} onClick={() => submitWord(word)}> Send </Button>
            <Button onClick={resetInput}> Clear </Button>

            <br />

            <Divider className={classes.divider} />

            {evaluations.map((evaluation, index) => {
                return (
                    <Tooltip key={"t" + index} title={evaluation.definitions}>
                        <Chip className={classes.chip} style={{ background: getChipColor(evaluation.result) }} key={index} label={evaluation.word} />
                    </Tooltip>
                )

            })}

            <br />

            <Divider className={classes.divider} />

            <Typography className={classes.text} variant="body"> {definition ? definition : "___"} </Typography> <br />
        </div>
    );
}