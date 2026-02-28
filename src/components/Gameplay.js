import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'; // Added Box for layout control

export default function Gameplay(props) {
    const { room, socket } = props;
    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState(null);
    const [evaluations, setEvaluations] = useState([]);
    const [pressedLetters, setPressedLetters] = useState([]);

    // Modern style object for sx prop
    const styles = {
        chip: {
            color: 'white',
            marginRight: '3px',
            marginTop: '5px'
        },
        letterButton: {
            marginRight: '10px',
            marginTop: '10px',
            width: '60px',
            height: '50px',
            fontSize: '24px',
        },
        text: {
            marginTop: '20px',
            marginBottom: '20px',
        },
        controls: {
            marginTop: '15px',
            marginBottom: '25px',
            touchAction: 'manipulation' // Critical for mobile gameplay
        },
        controlButton: {
            marginRight: '10px',
            width: '100px',
            height: '45px', 
        },
        paper: {
            padding: '10px',
            margin: '10px'
        },
        letterBox: {
            margin: 'auto',
            textAlign: 'center',
            touchAction: 'manipulation'
        }
    };

    useEffect(() => {
        socket.on("evaluationReply", (reply) => {
            setDefinition(reply.definitions ? reply.definitions[0] : "");
            setTimeout(() => setDefinition(null), 3000);
            setEvaluations(evaluations => [...evaluations, reply]);
        });

        // Cleanup listener on unmount
        return () => socket.off("evaluationReply");
    }, [socket]);

    useEffect(() => {
        if (!room.inRound) {
            setEvaluations([]);
            setWord("");
            setPressedLetters([]);
        }
    }, [room.inRound]);

    const addLetter = (index) => {
        setWord(`${word}${room.roundLetters[index]}`);
        setPressedLetters(prev => [...prev, index]);
    }

    const resetInput = () => {
        setWord("");
        setPressedLetters([]);
    }

    const deleteInput = () => {
        if (word.length > 0) {
            setWord(word.slice(0, -1));
            setPressedLetters(prev => prev.slice(0, -1));
        }
    }

    const submitWord = (currentWord) => {
        socket.emit("evaluateWordEntry", currentWord);
        resetInput();
    }

    const getChipColor = (result) => {
        switch (result) {
            case 1: return "#ffb74d";
            case 2: return "green";
            default: return "grey";
        }
    }

    return (
        <div>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {room.inRound && (
                    <Typography sx={styles.text} variant="h5"> 
                        {word ? word : '\u3000'} 
                    </Typography>
                )}

                <Box sx={styles.letterBox}>
                    {room.inRound && room.roundLetters.map((letter, index) => (
                        <Button
                            sx={styles.letterButton}
                            variant="contained"
                            key={index} 
                            disabled={pressedLetters.includes(index)} 
                            onClick={() => addLetter(index)}
                        >
                            {letter}
                        </Button>
                    ))}
                </Box>

                <Box sx={styles.controls}>
                    <Button 
                        sx={styles.controlButton} 
                        color='secondary' 
                        variant="contained" 
                        disabled={word.length < 3 || !room.inRound} 
                        onClick={() => submitWord(word)}
                    > 
                        Send 
                    </Button>
                    <Button 
                        sx={styles.controlButton} 
                        color='primary' 
                        variant="outlined" 
                        onClick={deleteInput}
                    > 
                        Delete 
                    </Button>
                </Box>
            </Stack>

            <Paper sx={styles.paper}>
                {evaluations.map((evaluation, index) => (
                    <Tooltip key={"t" + index} title={evaluation.definitions || ""}>
                        <Chip 
                            sx={{ ...styles.chip, backgroundColor: getChipColor(evaluation.result) }} 
                            label={evaluation.word} 
                        />
                    </Tooltip>
                ))}
            </Paper>

            <Paper sx={styles.paper}>
                <Typography variant="subtitle2"> 
                    {definition ? definition : '\u3000'} 
                </Typography>
            </Paper>
        </div>
    );
}