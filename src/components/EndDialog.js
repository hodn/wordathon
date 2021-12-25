import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


export default function EndDialog(props) {
    const room = props.room;

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const getBestPlayer = (room) => {
        const list = [];

        for (const playerID in room.players) {
            list.push(room.players[playerID]);
        }

        list.sort((a, b) => b.points - a.points);

        return list[0];

    }

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
                        {room ? getBestPlayer(room).name : 'N/A'} won with {room ? getBestPlayer(room).points : 'N/A'} points!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.emitRestart} autoFocus variant='contained' color='primary'>
                        Restart game
                    </Button>
                    <Button onClick={handleClose} variant='contained' color='secondary'>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}