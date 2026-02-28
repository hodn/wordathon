import React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function ScoreBoard(props) {
    const room = props.room;

    const getPlayers = (room) => {
        const players = [];
        if (room) {
            for (let playerID in room.players) {
                players.push(room.players[playerID]);
            }
        }
        players.sort(function (a, b) {
            return b.points - a.points;
        });
        return players;
    }

    const generateFont = (isPlayer) => {
        if (isPlayer) return 'bold';
        return 'normal'
    }

    const getRound = (room) => {
        if (room && room.settings && (room.round > 0)) {
            return `- Round (${room.round}/${room.settings.numberOfRounds})`
        } else return;
    }

    return (
        <div>
            <Typography variant='h5' style={{ marginBottom: 10 }}>Scoreboard {getRound(room)}</Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead style={{ background: '#00838f' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>Player</TableCell>
                            <TableCell style={{ color: 'white' }}>Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getPlayers(room).map((player) => (

                            <TableRow key={player.ID}>
                                <TableCell style={{ fontWeight: generateFont(player.ID === props.playerID) }} component="th" scope="row">
                                    {player.ID === props.playerID ? "• " : ""}  {player.name}
                                </TableCell>
                                <TableCell style={{ fontWeight: generateFont(player.ID === props.playerID) }} >{player.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {room && room.settings.numberOfRounds === room.round && room.inRound === false &&
                <Button room={room} onClick={props.emitRestart} variant='contained' color='secondary' style={{ marginTop: 20, marginLeft: 'auto' }}> Restart game </Button>}

        </div>

    );
}