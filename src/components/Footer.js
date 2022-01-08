import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function Footer() {

    return (

        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{position: 'fixed', bottom: 0, marginBottom: 20 }}
            >

                <Grid item xs={12} style={{borderTopColor: '#ff3d00', borderTopStyle: 'solid', padding: 15}}>
                    <Typography>Made by <a href="https://github.com/hodn">hodn</a></Typography>
                </Grid>

            </Grid>

        </div>
    );
}