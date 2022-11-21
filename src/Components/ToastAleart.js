import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react'
import { useMainContext } from '../Context/MainContext';

const ToastAleart = ({severity}) => { 
    const {
        OpenToast, 
        setOpenToast,
        ToastTitle, 
        ToastDes,
    } = useMainContext();

    const handleClose = () => {
        setOpenToast(false)
    }
    return ( 
    <Snackbar open={OpenToast} autoHideDuration={6000} anchorOrigin={{ vertical: "top",horizontal: "center" }} key="topcenter" onClose={handleClose} style={{width: "500px", maxWidth: "800px"}}>
        <Alert severity={severity} style={{width: "500px", maxWidth: "800px"}}>
        <AlertTitle>{ToastTitle}</AlertTitle>{ToastDes}</Alert> 
    </Snackbar>
    )
}

export default ToastAleart