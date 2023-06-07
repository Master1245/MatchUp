import { AppBar, Box, Button, Drawer, IconButton, Menu, Toolbar, Typography } from "@mui/material";

import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from 'react-router-dom';
import { WordLanguage } from "../language/Language";

import './navbar.styles.scss';
import MenuAdmin from "../menu-admin/MenuAdmin";
import MenuUser from "../menu-user/MenuUser";

export default function Navbar(): JSX.Element {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, isAdministrator } = useContext(AuthContext);

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
            <WordLanguage text="BaileSul" />
          </Typography>
          {isAuthenticated ?
            <Button onClick={() => openMenu(true)} className="buttonMenu"><SettingsIcon /></Button>
            :
            <Button onClick={() => navigate('/home')}
              color="inherit">
              <WordLanguage text="Login" />
            </Button>}
        </Toolbar>
      </AppBar>
      <Drawer
        className="MenuOptions"
        anchor="right"
        onClose={() => openMenu(false)}
        open={stateMenu}
      >
        <MenuUser />
        {isAdministrator && <MenuAdmin />}
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%'}}>
          <Button sx={{ width: '100%', fontSize: '1rem', fontWeight: 'bold' }} onClick={() => authContext.logout()}>
            <span style={{marginRight:10, fontSize:10}}><LogoutIcon /></span>
            <WordLanguage text="Sign out" />
          </Button>
        </Box>
      </Drawer>
    </Box>

  )
}