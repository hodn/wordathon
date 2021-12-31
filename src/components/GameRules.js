import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';

export default function GameRules() {

    return (
        <div>
            <Accordion style={{ maxWidth: '70vw' }}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>About</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Wordathon is a scrabble-like fun online multiplayer game. Create a game room and invite your friends on any device or platform.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion style={{ maxWidth: '70vw' }}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Game rules</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <p>The main goal of the game is to <strong>form nouns</strong> from the provided letters. The more words and the longer words, the better!</p>
                        <h3>For each existing noun you receive:</h3>
                        <ul>
                            <li><span style={{color: '#ffffff', backgroundColor: '#ff9900'}}>20 points</span> <strong>X</strong> the letter count</li>
                            <li><span style={{color: '#ffffff', backgroundColor: '#339966'}}>extra 100 points</span> for using it as a first player in the round</li>
                            <li>extra 300 points for <em>5 or more</em> lettered word</li>
                        </ul>
                        <p>Enjoy!</p>
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}