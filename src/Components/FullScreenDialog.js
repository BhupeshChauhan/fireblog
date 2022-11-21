import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useMainContext } from '../Context/MainContext';
import { Button } from 'react-bootstrap';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({children, title, ActionButtons}) {
    const { fullScreenDialogOpen,  setFullScreenDialogOpen } = useMainContext();
    
      const handlesetFullScreenDialogClose = () => {
        setFullScreenDialogOpen(false);
      };

  return (
      <Dialog
        fullScreen
        open={fullScreenDialogOpen}
        onClose={handlesetFullScreenDialogClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} style={{background: "#FFCA2B"}}>
          <Toolbar style={{color: "#000"}}>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
            {ActionButtons}
          </Toolbar>
        </AppBar>
        <div>
            {children}
        </div>
      </Dialog>
  );
}
