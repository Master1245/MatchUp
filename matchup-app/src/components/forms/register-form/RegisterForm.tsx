import { VisibilityOff, Visibility } from '@mui/icons-material';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, TextField, Box, Button, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { WordLanguage } from '../../Language/Language';

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Realizar a lógica de registro aqui, por exemplo, enviar uma solicitação de API
    if (username && email && password && password === confirmPassword) {
      console.log('Usuário registrado com sucesso!');
    } else {
      console.log('Por favor, preencha todos os campos corretamente.');
    }
  };

  return (
    <form>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', flexBasis: 3 }}>
        <FormControl variant="outlined" sx={{ margin: '1.5ch' }}>
          <TextField
            id="outlined-multiline-flexible"
            label={<WordLanguage text="Username" />}
            multiline
            maxRows={4}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl variant="outlined" sx={{ margin: '1.5ch' }}>
          <TextField
            id="outlined-multiline-flexible"
            label={<WordLanguage text="Email" />}
            multiline
            maxRows={4}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl variant="outlined" sx={{ margin: '1.5ch' }}>
          <InputLabel htmlFor="outlined-adornment-password">
            <WordLanguage text="Password" />
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl variant="outlined" sx={{ margin: '1.5ch' }}>
          <InputLabel htmlFor="outlined-adornment-confirm-password">
            <WordLanguage text="Confirm Password" />
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  edge="end"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '2.3rem', flexBasis: 3 }}>
        <FormControlLabel required control={<Checkbox />} label={
          <>
            <WordLanguage text="I accept all the terms and conditions." />
            <br></br>
            <WordLanguage text="I am over 18 years old." />
          </>
          } />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '2.3rem', flexBasis: 3 }}>
        <Button variant="contained" onClick={handleRegister}>
          <WordLanguage text="Register" />
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;