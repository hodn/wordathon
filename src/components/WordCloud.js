import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import Typography from '@mui/material/Typography';

export default function WordCloud(props) {

    const usedWords = props.room.roundWordPool;
    const words = []

    const callbacks = {
        getWordTooltip: word => `${word.value} player(s) - ${word.definition}`,
    }

    const options = {
        deterministic: true,
        fontFamily: [
            'Futura',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        fontSizes: [24, 100],
        rotations: 1,
        rotationAngles: [0]
      };

    for (const [key, info] of Object.entries(usedWords)) {
        words.push(
            {
                text: key,
                value: info.players.length,
                definition: info.definition
            }
        )
    }

    return (

        <div>
            <Typography variant='h6' style={{marginBottom: 10}}>Found words</Typography>
            <ReactWordcloud
                words={words}
                callbacks={callbacks}
                options={options}
            />
        </div>
    );
}