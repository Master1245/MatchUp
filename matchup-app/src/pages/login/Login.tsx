import { CardContent, CardActions, Button, Stack, FormControl, NativeSelect, TextField, Divider } from "@mui/material";
import { AnimateBackground } from "../../components/animate-background/AnimateBackground";

import './Login.style.scss'
import { TextLanguage } from "../../components/Language/Language";
import { Translate } from "../../context/TranslateContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from "react-router-dom";

export function Login() {
  const { language, setLanguage } = useContext(Translate);
  const authContext = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleChange = (e: { target: { value: any; }; }) => {
    setLanguage(e.target.value);
  };

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
                    <TextLanguage text="Email" />}
                />
              </div>
              <div className="password-div">
                <TextField id="password" variant="filled"
                  label={
                    <TextLanguage text="Password" />}
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
            <Button variant="contained">
              <TextLanguage text="Sign in" />
            </Button>
            <Button variant="contained" onClick={() => navigate('/register')}>
              <TextLanguage text="New here? Sign up" />
            </Button>
          </Stack>
        </CardActions>
      </div>
      <Button onClick={() => authContext.login()} >logar</Button> / <Button onClick={() => authContext.logout()}>Deslogar</Button>
      <div className="language-switcher">
        <FormControl fullWidth>
          <Stack spacing={2} direction="row">
            <PublicIcon className="icon-language" style={{ marginTop:'4px' }} />
            <NativeSelect
              defaultValue={language}
              value={language}
              onChange={handleChange}
              style={{
                width: '100%',
              }}
            >
              <option value={"en"}>English</option>
              <option value={"pt-BR"}>Português</option>
              <option value={"es"}>Español</option>
              <option value={"russian"}>русский</option>
            </NativeSelect>
          </Stack>
        </FormControl>
      </div>

    </AnimateBackground>
  )
}