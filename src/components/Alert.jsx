import React, { useState } from 'react';

// Material components
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert({message, severity}) {
    const [openAlert, setOpenAlert] = useState(true);

    // Close alert
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    }

    return (
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
}

export default Alert;