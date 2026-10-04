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
        let usedWords = room.roundWordPool || {};

        // At the end of the whole game, show words from all rounds
        if (room.round === room.settings.numberOfRounds && !room.inRound) {
            usedWords = Object.create(null);
            (room.wordPool || []).forEach(pool => {
                if (!pool) return;
                for (const [key, info] of Object.entries(pool)) {
                    if (!usedWords[key]) {
                        usedWords[key] = {
                            players: [...(info.players || [])],
                            playerNames: [...(info.playerNames || [])],
                            definition: info.definition
                        };
                    } else {
                        (info.players || []).forEach(p => {
                            if (!usedWords[key].players.includes(p)) {
                                usedWords[key].players.push(p);
                            }
                        });
                        (info.playerNames || []).forEach(name => {
                            if (!usedWords[key].playerNames.includes(name)) {
                                usedWords[key].playerNames.push(name);
                            }
                        });
                    }
                }
            });
        }

        const wordsArr = [];
        for (const [key, info] of Object.entries(usedWords)) {
            // Resolve player nicknames
            let playerNames = [];
            if (Array.isArray(info.playerNames) && info.playerNames.length > 0) {
                playerNames = [...info.playerNames];
            } else if (Array.isArray(info.players) && room.players) {
                playerNames = info.players
                    .map(id => room.players[id]?.name)
                    .filter(Boolean);
            }
            if (playerNames.length === 0) {
                playerNames = info.players && info.players.length > 0 
                    ? info.players.map(id => room.players?.[id]?.name || "Anonymous")
                    : ["Anonymous"];
            }

            // Deduplicate names for display
            const uniqueNames = Array.from(new Set(playerNames));

            wordsArr.push({
                text: key,
                count: (info.players && info.players.length) || uniqueNames.length,
                playerNames: uniqueNames,
                definition: Array.isArray(info.definition) ? info.definition.join(', ') : (info.definition || "")
            });
        }

        // Sort by longest first (or highest points essentially), then by count, then alphabetically
        return wordsArr.sort((a, b) => 
            b.text.length - a.text.length || 
            b.count - a.count || 
            a.text.localeCompare(b.text)
        );
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
                        <Chip
                            key={word.text}
                            color={word.text.length > 4 ? "primary" : "default"}
                            variant={word.count > 1 ? "filled" : "outlined"}
                            sx={{ 
                                fontSize: word.text.length > 4 ? '1.05rem' : '0.9rem',
                                fontWeight: word.text.length > 4 ? 'bold' : 'normal',
                                m: 0.6,
                                height: 'auto',
                                py: 0.4,
                                '& .MuiChip-label': {
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 1.2
                                }
                            }}
                            label={
                                <>
                                    <Tooltip 
                                        title={word.definition || "No definition available"} 
                                        arrow 
                                        placement="top"
                                        enterTouchDelay={0}
                                        leaveTouchDelay={3000}
                                    >
                                        <Box 
                                            component="span" 
                                            sx={{ 
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {word.text}
                                        </Box>
                                    </Tooltip>

                                    <Tooltip 
                                        title={
                                            <Box sx={{ p: 0.5, textAlign: 'center' }}>
                                                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.2 }}>
                                                    {word.playerNames.length === 1 ? 'Entered by:' : `Entered by (${word.playerNames.length}):`}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                                    {word.playerNames.join(', ')}
                                                </Typography>
                                            </Box>
                                        }
                                        arrow 
                                        placement="top"
                                        enterTouchDelay={0}
                                        leaveTouchDelay={3000}
                                    >
                                        <Box
                                            component="span"
                                            onClick={(e) => e.stopPropagation()}
                                            sx={{ 
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                minWidth: '22px',
                                                height: '22px',
                                                borderRadius: '11px',
                                                px: 0.6,
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                bgcolor: word.count > 1 
                                                    ? 'rgba(255, 255, 255, 0.35)' 
                                                    : 'rgba(0, 0, 0, 0.1)',
                                                color: 'inherit',
                                                cursor: 'pointer',
                                                transition: 'transform 0.15s, background-color 0.15s',
                                                '&:hover': {
                                                    transform: 'scale(1.2)',
                                                    bgcolor: word.count > 1 
                                                        ? 'rgba(255, 255, 255, 0.55)' 
                                                        : 'rgba(0, 0, 0, 0.2)',
                                                }
                                            }}
                                        >
                                            {word.count}
                                        </Box>
                                    </Tooltip>
                                </>
                            }
                        />
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

