import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Stack from '@mui/material/Stack';



import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
    chip: {
        color: 'white',
        marginRight: 3,
        marginTop: 5
    },
    letterButton: {
        marginRight: 10,
        marginTop: 10,
        width: 85,
        height: 70,
        fontSize: 24
    },
    text: {
        marginTop: 20,
        marginBottom: 20,
    },
    controls: {
        marginTop: 15,
        marginBottom: 25
    },
    controlButton: {
        marginRight: 10,
        width: 100
    },
    paper: {
        padding: 10,
        margin: 10
    },
    definition: {
        marginTop: 30,
    },
    letterBox: {
        margin: 'auto',
        textAlign: 'center',
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
        if (!room.inRound) {
            setEvaluations([]);
            resetInput();
        }

    }, [room]);

    const addLetter = (index) => {
        setWord(`${word}${room.roundLetters[index]}`);
        setPressedLetters(pressedLetters => [...pressedLetters, index]);
    }

    const resetInput = () => {
        setWord("");
        setPressedLetters([]);
    }

    const deleteInput = () => {
        if (word.length > 0) {
            setWord(word.slice(0, -1));
            const alreadyPressedLetters = [...pressedLetters];
            alreadyPressedLetters.splice(-1);
            setPressedLetters(alreadyPressedLetters);
        }
    }

    const submitWord = (word) => {
        socket.emit("evaluateWordEntry", word);
        resetInput();
    }

    const getChipColor = (result) => {
        switch (result) {
            case 1:
                return "#ffb74d";
            case 2:
                return "green";
            default:
                return "grey";
        }
    }

    return (

        <div>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {room.inRound && <Typography className={classes.text} variant="h5"> {word ? word : '\u3000'} </Typography>}

                <div className={classes.letterBox}>
                    {room.inRound && room.roundLetters.map((letter, index) => {
                        return (
                            <Button
                                className={classes.letterButton}
                                variant="contained"
                                key={index} disabled={pressedLetters.includes(index)} onClick={() => addLetter(index)}>{letter}
                            </Button>)
                    })}
                </div>


                <div className={classes.controls}>
                    <Button className={classes.controlButton} color='secondary' variant="contained" disabled={word.length < 3 || !room.inRound} onClick={() => submitWord(word)}> Send </Button>
                    <Button className={classes.controlButton} color='primary' variant="outlined" onClick={deleteInput}> Delete </Button>
                </div>
            </Stack>


            <Paper className={classes.paper}>

                {evaluations.map((evaluation, index) => {
                    return (
                        <Tooltip key={"t" + index} title={evaluation.definitions}>
                            <Chip className={classes.chip} style={{ background: getChipColor(evaluation.result) }} key={index} label={evaluation.word} />
                        </Tooltip>
                    )

                })}

            </Paper>

            <Paper className={classes.paper}>
                <Typography className={classes.definition} variant="body"> {definition ? definition : '\u3000'} </Typography>
            </Paper>

        </div>
    );
}