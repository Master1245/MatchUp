import { ReactNode, createContext, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingContext = createContext<LoadingContextType>({
    open: false,
    closeLoading: () => {},
    openLoading: () => {},
});

type LoadingContextType = {
    open: boolean;
    closeLoading: () => void;
    openLoading: () => void;
};

type LoadingContextProviderProps = {
    children: ReactNode;
};

export function LoadingContextProvider({ children }: LoadingContextProviderProps) {
  const [open, setOpen] = useState(false);

  const closeLoading = () => {
    setOpen(false);
  };

  const openLoading = () => {
    setOpen(true);
  };

  return (
    <LoadingContext.Provider value={{ open, closeLoading, openLoading }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </LoadingContext.Provider>
  );
}
