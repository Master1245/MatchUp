import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from 'react-router-dom';
import { TextLanguage } from "../Language/Language";

import './navbar.styles.scss';

export default function Navbar(): JSX.Element {
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = useContext(AuthContext);
  const [stateMenu, openMenu] = useState(false);

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
          {isAuthenticated ?
            <Button onClick={() => openMenu(true)} className="buttonMenu"><MenuIcon /></Button>
            :
            <Button onClick={() => navigate('/home')}
              color="inherit">
              <TextLanguage text="Login" />
            </Button>}
        </Toolbar>
      </AppBar>
      <Drawer
        className="MenuOptions"
        anchor="right"
        onClose={() => openMenu(false)}
        open={stateMenu}
      >
        adsdadaasaasdasadasasdasd
        
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%'}}>
          <Button sx={{ width: '100%', fontSize: '1rem', fontWeight: 'bold' }} onClick={() => authContext.logout()}>
            <span style={{marginRight:10, fontSize:10}}><LogoutIcon /></span>
            <TextLanguage text="Sign out" />
          </Button>
        </Box>
      </Drawer>
    </Box>

  )
}