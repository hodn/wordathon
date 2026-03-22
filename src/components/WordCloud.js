import React, { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function WordCloud(props) {
    const { room, socket, playerID } = props;

    const words = useMemo(() => {
        let usedWords = room.roundWordPool;

        // At the end of the whole game, show words from all rounds
        if (room.round === room.settings.numberOfRounds && !room.inRound) {
            usedWords = Object.create(null);
            room.wordPool.forEach(pool => {
                for (const [key, info] of Object.entries(pool)) {
                    if (!usedWords[key]) {
                        usedWords[key] = {
                            players: [...info.players],
                            definition: info.definition
                        };
                    } else {
                        info.players.forEach(p => {
                            if (!usedWords[key].players.includes(p)) {
                                usedWords[key].players.push(p);
                            }
                        });
                    }
                }
            });
        }

        const wordsArr = [];
        for (const [key, info] of Object.entries(usedWords)) {
            wordsArr.push({
                text: key,
                count: info.players.length,
                definition: Array.isArray(info.definition) ? info.definition.join(', ') : info.definition
            });
        }
        // Sort by count (most popular first) then alphabetically
        return wordsArr.sort((a, b) => b.count - a.count || a.text.localeCompare(b.text));
    }, [room]);

    const isGameEnded = room.round === room.settings.numberOfRounds;
    const isReady = room.readyPlayers?.includes(playerID);

    const handleReady = () => {
        if (socket) socket.emit("toggleReady");
    };

    const handleForceStart = () => {
        if (socket) socket.emit("forceStartNextRound");
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant='h6'>
                    {isGameEnded ? "Game Summary" : "Found words"}
                </Typography>
                {!isGameEnded && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {room.ownerID === playerID && (
                            <Button variant="outlined" color="secondary" onClick={handleForceStart}>
                                Force Start
                            </Button>
                        )}
                        <Button 
                            variant="contained" 
                            color={isReady ? "success" : "primary"} 
                            onClick={handleReady}
                        >
                            {isReady ? "Ready ✅" : "Ready"}
                        </Button>
                    </Box>
                )}
            </Box>
            
            {words.length > 0 ? (
                <Stack 
                    direction="row" 
                    spacing={1} 
                    useFlexGap 
                    flexWrap="wrap" 
                    justifyContent="center"
                    sx={{ p: 1 }}
                >
                    {words.map((word) => (
                        <Tooltip 
                            key={word.text} 
                            title={word.definition} 
                            arrow 
                            placement="top"
                            enterTouchDelay={0}
                            leaveTouchDelay={3000}
                        >
                            <Chip
                                label={`${word.text} (${word.count})`}
                                color={word.count > 1 ? "primary" : "default"}
                                variant={word.count > 1 ? "filled" : "outlined"}
                                sx={{ 
                                    fontSize: word.count > 1 ? '1.1rem' : '0.9rem',
                                    fontWeight: word.count > 1 ? 'bold' : 'normal',
                                    m: 0.5,
                                    cursor: 'pointer'
                                }}
                            />
                        </Tooltip>
                    ))}
                </Stack>
            ) : (
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', textAlign: 'center', py: 2 }}>
                    No words were found yet.
                </Typography>
            )}
        </Box>
    );
}
