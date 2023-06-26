import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Avatar, Box, Grid, styled } from "@mui/material";

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
}));

export function TabProfile() {
    const {
        username,
        email,
        bio,
        avatar,
        local,
        social_media
    } = useContext(UserContext);

    return (
        <Box sx={{
            flexGrow: 1,
            marginLeft: '15px',
        }}>

            <h3
                style={{ padding: '10px', fontWeight: 'bold', textAlign: 'center' }}
            >
                Seu perfil
            </h3>
            <Grid
                container
                spacing={2}
                borderColor="grey.500"
                borderRadius={1}
                bgcolor={"#dddddd"}
            >
                <Grid xs={8}>
                    <Div>
                        <h3>
                            <span style={{ fontWeight: 'bold', color: '#777' }}>Nome de usuário:</span> {username}
                        </h3>
                    </Div>
                    <Div>
                        <h3>
                            <span style={{ fontWeight: 'bold', color: '#777' }}>Email:</span> {email}
                        </h3>
                    </Div>
                </Grid>
                <Grid xs={4}>
                    <Div
                        style={{ height: '100%' }}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={avatar}
                            sx={{ width: '90%', height: '90%' }}
                        />
                    </Div>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
                borderColor="grey.500"
                borderRadius={1}
            >
                <Grid xs={12}>
                    <Div>
                        <h3>
                            <span style={{ fontWeight: 'bold', color: '#777' }}>Bio:</span> {bio}
                        </h3>
                    </Div>
                </Grid>
                <Grid xs={6}>
                    <Div>
                        <h3>
                            <span style={{ fontWeight: 'bold', color: '#777' }}>Local:</span> {local}
                        </h3>
                    </Div>
                </Grid>
                <Grid xs={6}>
                    <Div>
                        <h3>
                            <span style={{ fontWeight: 'bold', color: '#777' }}>Rede social:</span> {social_media}
                        </h3>
                    </Div>
                </Grid>
            </Grid>
        </Box>
    )
}