import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';


export default function InviteLinkCard(props) {
    const inviteLink = "localhost:3000/join/" + props.ID;
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
            <Card>
                <CardContent>
                    <Typography variant="h3">
                        Invite your friends!
                    </Typography>
                    <Typography>
                        <TextField
                            id="filled-read-only-input"
                            label="Invitation link"
                            value={inviteLink}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="primary"
                        onClick={copyToClipboard}
                    >
                        Copy link
                    </Button>
                </CardActions>
            </Card>

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