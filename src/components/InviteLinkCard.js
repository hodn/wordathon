import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import QRCode from "react-qr-code";


export default function InviteLinkCard(props) {
    const inviteLink = 'https://' + window.location.href.split('/')[2] + '/' + window.location.href.split('/')[3] + "/join/" + props.room.ID;
    const [snackOpen, openSnack] = React.useState(false);
    const room = props.room;
    const dataShare = {
        title: 'Wordathon',
        text: room.players[room.ownerID].name + ' challenges you to a game!',
        url: inviteLink
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        openSnack(true);

        setTimeout(() => {
            openSnack(false);
        }, 2000);
    }

    const shareLink = async () => {
        try {
            await navigator.share(dataShare)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>

            <Typography variant='h5' style={{ marginBottom: 5 }}> Invite friends</Typography>
            <Typography variant='subtitle1' style={{ marginBottom: 5 }}> Friends can scan & play!</Typography>


            <Grid
                container
                spacing={5}
            >
                <Grid item xs={12}  md={4}>
                    
                    <QRCode
                        size={150}
                        value={inviteLink}
                    />

                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography>
                        <TextField
                            label="Invitation link"
                            value={inviteLink}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                            style={{ width: "100%" }}
                            onClick={copyToClipboard}
                            fullWidth
                        />
                    </Typography>
                    
                    {navigator.canShare && <Button
                        onClick={shareLink}
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: 'auto', marginTop: 20 }}
                    >
                        Share invite
                    </Button>}

                    {!navigator.canShare && <Button
                        onClick={copyToClipboard}
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: 'auto', marginTop: 20 }}
                    >
                        Copy link
                    </Button>}
                </Grid>

            </Grid>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackOpen}
                message="URL copied to clipboard"
            />
        </div>
    );
}