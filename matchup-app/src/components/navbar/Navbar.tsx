import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from 'react-router-dom';
import { TextLanguage } from "../Language/Language";

export default function Navbar(): JSX.Element{
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                MatchUp
                </Typography>
                {isAuthenticated ? <MenuIcon /> : <Button onClick={() => navigate('/home')} color="inherit">
                    <TextLanguage text="Login" />    
                </Button>}
            </Toolbar>
            </AppBar>
        </Box>
    )
}