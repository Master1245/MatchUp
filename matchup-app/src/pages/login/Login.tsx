import { CardContent, CardActions, Button, Stack, TextField, Divider } from "@mui/material";
import { AnimateBackground } from "../../components/animate-background/AnimateBackground";

import './Login.style.scss'
import { TextLanguage } from "../../components/Language/Language";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SelectLanguage from "../../components/select-language/SelectLanguage";

export function Login() {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      authContext.login(username, password);
    }else{
      alert('Preencha todos os campos');
    }
  }

  return (
    <AnimateBackground>
      <div className="login-card">
        <CardContent sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <div className="header-login">
            <div className="logo">
              MatchUp
            </div>
            <small>
              <TextLanguage text="Find your match in the game of life"/>
            </small>
            <Divider />
            <Stack direction="column" justifyContent="center">
              <div className="email-div">
                <TextField id="email" variant="filled"
                  label={
                    <TextLanguage text="Email or Username" />
                  }
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="password-div">
                <TextField id="password" variant="filled" type="password"
                  label={
                    <TextLanguage text="Password" />
                  }
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Stack>
          </div>
        </CardContent>
        <Divider />
        <CardActions sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <Stack spacing={2} direction="column" justifyContent="center">
            <Button variant="contained" onClick={handleLogin}>
              <TextLanguage text="Sign in" />
            </Button>
            <Button variant="contained" onClick={() => navigate('/register')}>
              <TextLanguage text="New here? Sign up" />
            </Button>
          </Stack>
        </CardActions>
      </div>
      <div className="language-switcher">
        <SelectLanguage />
      </div>
    </AnimateBackground>
  )
}