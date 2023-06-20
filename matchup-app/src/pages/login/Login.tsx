import { CardContent, CardActions, Button, Stack, TextField, Divider } from "@mui/material";
import { AnimateBackground } from "../../components/animate-background/AnimateBackground";

import './Login.style.scss'
import { WordLanguage } from "../../components/Language/Language";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SelectLanguage from "../../components/select-language/SelectLanguage";

export function Login() {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e:any) => {
    e.preventDefault();
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
              <WordLanguage text="BaileSul" />
            </div>
            <small>
              <WordLanguage text="Find your match on the Santa Catarina coast and region."/>
            </small>
            <Divider />
            <Stack direction="column" justifyContent="center">
              <div className="email-div">
                <TextField id="email" variant="filled"
                  label={
                    <WordLanguage text="Email or Username" />
                  }
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="password-div">
                <TextField id="password" variant="filled" type="password"
                  label={
                    <WordLanguage text="Password" />
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
            <Button variant="contained" onClick={function(e) { handleLogin(e) }}>
              <WordLanguage text="Sign in" />
            </Button>
            <Button variant="contained" onClick={() => navigate('/register')}>
              <WordLanguage text="New here? Sign up" />
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