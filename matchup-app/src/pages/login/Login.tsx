import { Card, CardContent, CardActions, Button, Stack, FormControl, NativeSelect, TextField, Divider } from "@mui/material";
import { AnimateBackground } from "../../components/animate-background/AnimateBackground";

import './Login.style.scss'
import { TextLanguage } from "../../components/Language/Language";
import { Translate } from "../../context/TranslateContext";
import { useContext } from "react";

export function Login() {

  const { language, setLanguage } = useContext(Translate);

  const handleChange = (e: { target: { value: any; }; }) => {
    setLanguage(e.target.value);
  };

  return (
    <AnimateBackground>
      <Card className="login-card">
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

            <Button variant="outlined">
              <TextLanguage text="Sign in" />
            </Button>
            <Button variant="outlined">
              <TextLanguage text="Sign up" />
            </Button>
          </Stack>
        </CardActions>
      </Card>

      <div className="language-switcher">
        <FormControl fullWidth>
          <NativeSelect
            defaultValue={language}
            value={language}
            onChange={handleChange}
          >
            <option value={"en"}>English</option>
            <option value={"pt-BR"}>Português</option>
            <option value={"es"}>Español</option>
            <option value={"russian"}>русский</option>
          </NativeSelect>
        </FormControl>
      </div>

    </AnimateBackground>
  )
}