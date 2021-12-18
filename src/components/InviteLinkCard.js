import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';


export default function InviteLinkCard(props) {
    const inviteLink = "localhost:3000/join/" + props.room.ID;
    const [snackOpen, openSnack] = React.useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        openSnack(true);

        setTimeout(() => {
            openSnack(false);
        }, 2000);
    }

    return (
        <div>

            <Typography variant='h6' style={{marginBottom: 10}}> Invite friends</Typography>


            <Grid
                container
                direction="column"
                alignItems="left"
                justifyContent="space-between"
                spacing={1}
            >

                <Grid item>
                    <Typography>
                        <TextField
                            label="Invitation link"
                            value={inviteLink}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                            onClick={copyToClipboard}
                            fullWidth
                        />
                    </Typography>
                </Grid>

                <Grid item> 
                    <Button
                        onClick={copyToClipboard}
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: 'auto' }}
                    >
                        Copy link
                    </Button>
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