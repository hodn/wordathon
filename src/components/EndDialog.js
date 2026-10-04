import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


export default function EndDialog(props) {
    const room = props.room;

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const getBestPlayer = (room) => {
        const list = [];
        if (room && room.players) {
            for (const playerID in room.players) {
                if (room.players[playerID]) {
                    list.push(room.players[playerID]);
                }
            }
        }
        list.sort((a, b) => b.points - a.points);
        return list[0] || null;
    }

    const bestPlayer = getBestPlayer(room);
    const totalWords = room && Array.isArray(room.wordPool)
        ? room.wordPool.reduce((total, pool) => total + (pool ? Object.keys(pool).length : 0), 0)
        : 0;

    return (

        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    Congratulations!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {bestPlayer ? `${bestPlayer.name} won with ${bestPlayer.points} points!` : 'Game has ended!'}
                    </DialogContentText>
                    <DialogContentText sx={{ marginTop: 2 }}>
                        A total of {totalWords} unique words were found across all rounds.
                    </DialogContentText>
                    <DialogContentText sx={{ marginTop: 1, fontStyle: 'italic' }}>
                        Check out the word cloud summary below!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color='secondary'>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}