import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { WordLanguage } from '../Language/Language';
import SelectLanguage from '../select-language/SelectLanguage';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ConfigurationsProps = {
    children: React.ReactElement;
}

export default function Configurations({children}: ConfigurationsProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <a onClick={handleClickOpen}>
        {children}
      </a>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <WordLanguage text="Configurations" />
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
                <WordLanguage text="Save" />
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{padding: "20px"}}>
            <WordLanguage text="Change Language" />
            <SelectLanguage />
        </div>
      </Dialog>
    </div>
  );
}
