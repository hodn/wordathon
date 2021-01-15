import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

export default function ScoreBoard(props) {
    const room = props.room;

    const getPlayers = (room) => {
        const players = [];
        if (room) {
            for (let playerID in room.players) {
                players.push(room.players[playerID]);
            }
        }
        players.sort(function(a, b) {
            return b.points - a.points;
          });
        return players;
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Player</TableCell>
                        <TableCell>Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getPlayers(room).map((player) => (
                        <TableRow key={player.ID}>
                            <TableCell component="th" scope="row">
                                {player.name}
                            </TableCell>
                            <TableCell>{player.points}</TableCell> 
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}