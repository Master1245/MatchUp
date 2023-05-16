import { Card, CardContent, CardActions, Button, Stack, FormControl, NativeSelect, TextField, Divider } from "@mui/material";
import { AnimateBackground } from "../../components/animate-background/AnimateBackground";

import './Login.style.scss'
import { TextLanguage } from "../../components/Language/Language";
import { TranslateContext } from "../../context/TranslateContext";
import { useContext } from "react";

export function Login() {

  const { language, setLanguage } = useContext(TranslateContext);

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
              <TextLanguage
                pt="Encontre seu par no jogo da vida"
                en="Find your match in the game of life"
                es="Encuentra tu pareja en el juego de la vida"
                russian="Найдите свою пару в игре жизни"
              />
            </small>
            <Divider />
            <Stack direction="column" justifyContent="center">
              <div className="email-div">
                <TextField id="email" variant="filled"
                  label={
                    <TextLanguage
                      pt="Email"
                      en="Email"
                      es="Email"
                      russian="Эл. адрес"
                    />}
                />
              </div>
              <div className="password-div">
                <TextField id="password" variant="filled"
                  label={
                    <TextLanguage
                      pt="Senha"
                      en="Password"
                      es="Contraseña"
                      russian="пароль"
                    />}
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

            <Button>
              <TextLanguage
                pt="Entrar"
                en="Sign in"
                es="Entrar"
                russian="Войти"
              />
            </Button>
            <Button>
              <TextLanguage
                pt="É novo por aqui? Cadastre-se"
                en="New here? Sign up"
                es="¿Eres nuevo aquí? Regístrate"
                russian="Здесь что-то новое? Регистрация"
              />
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