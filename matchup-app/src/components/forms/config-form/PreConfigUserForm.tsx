// import { VisibilityOff, Visibility } from "@mui/icons-material";
// import { Box, FormControl, TextField, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControlLabel, Checkbox, Button, Divider } from "@mui/material";
// import { WordLanguage } from "../../Language/Language";
// import RegisterForm from "../register-form/RegisterForm";

// const PreConfigUserForm: React.FC = () => {
//   return (
//     <form>
//       <p>
//         <WordLanguage text="Just one more thing!" />
//       </p>
//       <small>
//         <WordLanguage text="Only one more step is needed before you can use our application, tell us a little more about yourself!" />
//       </small>
//       <Divider />
//       <Box sx={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', flexBasis: 3 }}>
//         <FormControl variant="outlined" sx={{ margin: '1.5ch' }}>
//           <TextField
//             id="outlined-multiline-flexible"
//             label={<WordLanguage text="Username" />}
//             multiline
//             {...(usernameError && { error: true, helperText: <WordLanguage text="Username is required and must be 3 characters long" /> })}
//             maxRows={4}
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </FormControl>
//         <FormControl variant="outlined" sx={{ margin: '1.5ch' }}>
//           <TextField
//             id="outlined-multiline-flexible"
//             label={<WordLanguage text="Email" />}
//             multiline
//             {...(emailError && { error: true, helperText: <WordLanguage text="Email is not valid" /> })}
//             maxRows={4}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </FormControl>
//         <FormControl variant="outlined" sx={{ margin: '1.5ch' }}>
//           <InputLabel htmlFor="outlined-adornment-password">
//             <WordLanguage text="Password" />
//           </InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-password"
//             type={showPassword ? 'text' : 'password'}
//             value={password}
//             {...(passwordError && { error: true, helperText: <WordLanguage text="Confirm this password value is correct" /> })}
//             onChange={(e) => setPassword(e.target.value)}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   edge="end"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//         </FormControl>
//         <FormControl variant="outlined" sx={{ margin: '1.5ch' }}>
//           <InputLabel htmlFor="outlined-adornment-confirm-password">
//             <WordLanguage text="Confirm Password" />
//           </InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-confirm-password"
//             type={showConfirmPassword ? 'text' : 'password'}
//             value={confirmPassword}
//             {...(confirmPasswordError && { error: true, helperText: <WordLanguage text="Confirm this password value is correct" /> })}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle confirm password visibility"
//                   edge="end"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Confirm Password"
//           />
//         </FormControl>
//       </Box>
//       <div
//         style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>
//         <a href="/privacy-policy" target="_blank" rel="noreferrer">
//           <WordLanguage text="Check here all our terms of use" />
//         </a>
//       </div>
//       <Box sx={{ display: 'flex', flexDirection: 'column', padding: '2.3rem', flexBasis: 3 }}>
//         <FormControlLabel required value={terms} control={
//           <Checkbox />
//         } label={
//           <>
//             <WordLanguage text="I accept all the terms and conditions." />
//             <br></br>
//             <WordLanguage text="I am over 18 years old." />
//           </>
//         } />
//         <p style={{ color: 'red', marginTop: 10 }}>{termsError && <WordLanguage text="You must accept the terms and conditions." />}</p>

//       </Box>
//       <Box sx={{ display: 'flex', flexDirection: 'column', padding: '2.3rem', flexBasis: 3 }}>
//         <Button variant="contained" onClick={handleRegister}>
//           <WordLanguage text="Register" />
//         </Button>
//       </Box>
//     </form>
//   );
// };

// export default RegisterForm;


const PreConfigUserForm = async() => {
  return(
      <>
      </>
  )
}

export default PreConfigUserForm;