import  React, {useState} from 'react';

import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';


export default function SimpleBackdrop({}) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
