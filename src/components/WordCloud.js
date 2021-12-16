import React from 'react';
import ReactWordcloud from 'react-wordcloud';

export default function WordCloud(props) {

    const usedWords = props.room.roundWordPool;
    const words = []

    const callbacks = {
        getWordTooltip: word => `${word.value} player(s) - ${word.definition}`,
    }

    const options = {
        rotations: 1,
        rotationAngles: [0],
        fontFamily: 'Helvetica'
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
            <ReactWordcloud
                words={words}
                callbacks={callbacks}
                options={options}
            />
        </div>
    );
}