import React from 'react';
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

    const generateFont = (isPlayer) => {
        if (isPlayer) return 'bold';
        return 'normal'
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead style={{background: '#ff3d00'}}>
                    <TableRow>
                        <TableCell style={{color: 'white'}}>Player</TableCell>
                        <TableCell style={{color: 'white'}}>Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getPlayers(room).map((player) => (

                        <TableRow key={player.ID}>
                            <TableCell style={{fontWeight: generateFont(player.ID === props.playerID)}} component="th" scope="row">
                              {player.ID === props.playerID ? "|" : ""}  {player.name}
                            </TableCell>
                            <TableCell style={{fontWeight: generateFont(player.ID === props.playerID)}} >{player.points}</TableCell> 
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}