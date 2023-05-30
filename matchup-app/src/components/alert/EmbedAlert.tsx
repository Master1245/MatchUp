import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type EmbedAlertProps = {
  onOpen: (value:boolean) => any;
  visible: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  messages: string;
};

export default function EmbedAlert({ onOpen, visible, type, messages }: EmbedAlertProps) {
  return (
    <Snackbar open={visible} autoHideDuration={6000} onClose={onOpen(false)}>
      <Alert onClose={onOpen(false)} severity={type} sx={{ width: '100%' }}>
        {messages}
      </Alert>
    </Snackbar>
  );
}
