import Snackbar from '@mui/material/Snackbar';
import { ReactNode, createContext, useContext, useState } from "react";
import { Alert, AlertColor } from '@mui/material';
import { searchWord } from '../components/Language/Language';
import { Translate } from './TranslateContext';

export const AlertContext = createContext<AlertContextType>({
    open: false,
    closeAlert: () => { },
    openAlert: (text: string, type: AlertColor) => { },
});

type AlertContextType = {
    open: boolean;
    closeAlert: () => void;
    openAlert: (text: string, type: AlertColor) => void;
};

type AlertContextProviderProps = {
    children: ReactNode;
};

export function AlertContextProvider({ children }: AlertContextProviderProps) {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [type, setType] = useState<AlertColor>("info");
    
    const { language } = useContext(Translate);

    const openAlert = (text: string, type: AlertColor) => {
        setText(searchWord(text, language));
        setType(type);
        setOpen(true);
    };

    const closeAlert = () => {
        setOpen(false);
        setTimeout(() => {
            setText('');
            setType("info");
        }, 200);
    };

    const action = (
        <Alert severity={type}>
            {text}
        </Alert>
    );

    return (
        <AlertContext.Provider value={{ open, closeAlert, openAlert }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
                {action}
            </Snackbar>
            {children}
        </AlertContext.Provider>
    );
}
