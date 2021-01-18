import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Gameplay(props) {
    const room = props.room;
    const socket = props.socket;
    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState(null);
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        socket.on("evaluationReply", (reply) => {
            setDefinition(reply.definitions[0]);
            setTimeout(() => setDefinition(null), 3000);
            setEvaluations([...evaluations, reply]); 
        });
    }, []);

    const addLetter = (index) => {
        setWord(`${word}${room.roundLetters[index]}`);
    }

    const submitWord = (word) => {
        socket.emit("evaluateWordEntry", word);
        setWord("");
    }

    return (

        <div>
            <Typography variant="h1"> {word ? word : "........."} </Typography>
            {definition && <Typography variant="h3"> {definition} </Typography>}
            {room.roundLetters.map((letter, index) => {
                return <Button key={index} onClick={() => addLetter(index)}>{letter}</Button>
            })} <br />
            <Button disabled={word.length < 2} onClick={() => submitWord(word)}> Send </Button>
            <Button onClick={() => setWord("")}> Clear </Button>
        </div>
    );
}