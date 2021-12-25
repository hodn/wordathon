import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';

export default function GameRules() {

    return (
        <div>
            <Accordion style={{ maxWidth: '60vw' }}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>About</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Wordathon is a scrabble-like fun online multiplayer game. Create a private game room and invite your friends on any device or platform.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion style={{ maxWidth: '60vw' }}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Game rules</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <p>The main goal of the game is to <strong>form nouns</strong> from provided letters. The more words and the longer words, the better!</p>
                        <h3>For each existing noun you receive:</h3>
                        <ul>
                            <li><span style={{ backgroundColor: '#ffb74d' }}>20 points</span> for an existing noun</li>
                            <li>(10 * number of letters) points</li>
                        </ul>
                        <p>If the noun <em>has not</em> yet been used in the round, you get <span style={{ backgroundColor: 'green', color: 'white' }}>extra 20 points</span>.</p>
                        <p>Enjoy!</p>
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}