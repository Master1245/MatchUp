import { Card, CardContent, CardActions, Button, Box } from "@mui/material";
import { AnimateBackground } from "../../components/animate-background/AnimateBackground";

import './Login.style.scss'

export function Login() {
  return (
    <AnimateBackground>
        <Card className="login-card">
          <CardContent sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            asdasdasd
          </CardContent>
          <CardActions sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <Button>Learn More</Button>
          </CardActions>
        </Card>
    </AnimateBackground>
  )
}