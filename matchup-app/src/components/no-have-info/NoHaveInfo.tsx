import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider, Slide, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import "./NoHaveInfo.styles.scss";
import { axiosUpdateSummary } from "../../api/requests/user";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function NoHaveInfo() {
    const [this_bio, this_setBio] = useState('');
    const [this_avatar, this_setAvatar] = useState('');
    const [this_minimal_score, this_setMinimalScore] = useState(0);
    const [this_local, this_setLocal] = useState('');
    const [this_social_media, this_setSocialMedia] = useState('');

    const {
        bio, setBio,
        avatar, setAvatar,
        minimal_score, setMinimalScore,
        local, setLocal,
        social_media, setSocialMedia
    } = useContext(UserContext);

    function setsOtherInfos() {
        setBio(this_bio);
        setAvatar(this_avatar);
        setMinimalScore(this_minimal_score);
        setLocal(this_local);
        setSocialMedia(this_social_media);
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        //travar o botão de salvar
        document.querySelector('button.btn-continue')?.setAttribute('disabled', 'true');
        console.log('handleClose');
        console.log(
            this_bio,
            this_avatar,
            this_minimal_score,
            this_local,
            this_social_media
        )

        try {
            await axiosUpdateSummary({
                bio: this_bio,
                avatar: this_avatar,
                minimal_score: this_minimal_score,
                local: this_local,
                social_media: this_social_media
            });
            
            setBio(this_bio);
            setAvatar(this_avatar);
            setMinimalScore(this_minimal_score);
            setLocal(this_local);
            setSocialMedia(this_social_media);

            document.querySelector('button.btn-continue')?.removeAttribute('disabled');

            setOpen(false);
        }
        catch (error: any) {
            // setar os valores no context se der certo a parada, mais como não temos o context ainda, vamos deixar assim
            // foda-se
        }
    };

    useEffect(() => {
        //  // descomentar quando essa merda tiver pronta
        if(
            bio !== '' &&
            avatar !== '' &&
            minimal_score !== 0 &&
            local !== '' &&
            social_media !== ''
        ) {
            //handleClickOpen();
        }
    }, []);

    function setsProfileMarks(src: string) {
        this_setAvatar(src);
        //add class to image qwith selected border and remove from others
        document.querySelectorAll('img').forEach((img) => {
            img.classList.remove('selected');
        });
        document.querySelector(`img[src="${src}"]`)?.classList.add('selected');
        setsOtherInfos();
    }


    const getImages = () => {
        const images = [];
        for (let i = 1; i <= 16; i++) {
            images.push(
                <img
                    src={`/images/avatar/user (${i}).png`}
                    alt={`Avatar ${i}`}
                    style={{
                        width: '105px',
                        height: '105px',
                        cursor: 'pointer',
                    }}
                    onClick={() => setsProfileMarks(`/images/avatar/user (${i}).png`)}
                />
            );
        }
        return (
            <div 
                style={{ 
                display: 'flex', flexWrap: 'wrap', 
                justifyContent: 'center', alignItems: 'center',
                width: '100%',
                maxHeight: '325px',
                overflowY: 'scroll'
            }}>
                {images}
            </div>
        )
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Terminar Cadastro
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose} className="btn-continue">
                            Continuar
                        </Button>
                    </Toolbar>
                </AppBar>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <h3
                        style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            marginBottom: '20px',
                        }}
                    >
                        Complete seu perfil!
                    </h3>
                    <FormControl sx={{ m: 1, width: '96%' }} variant="outlined">
                        <TextField
                            id="outlined-multiline-static"
                            label="Escreva uma 'bio' para seu perfil"
                            multiline
                            rows={4}
                            style={{
                                width: '100%'
                            }}
                            defaultValue={bio}
                            onChange={(e) => this_setBio(e.target.value)}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '96%' }} variant="outlined">
                        <TextField
                            id="outlined"
                            label="Você mora na região de..."
                            defaultValue="Florianópolis"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '96%' }} variant="outlined">
                        <InputLabel id="demo-simple-select-helper-label">Selecione o nível de exigência</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Selecione o nível de exigência"
                            value={this_minimal_score || 100}
                        >
                            <MenuItem value={100}>Normal</MenuItem>
                            <MenuItem value={150}>Filtrado</MenuItem>
                            <MenuItem value={200}>Muito Exigente</MenuItem>
                        </Select>
                    </FormControl>
                    <Divider
                        style={{
                            marginTop: '20px',
                            marginBottom: '20px',
                        }}
                    />
                    <InputLabel 
                        style={{
                            marginLeft: '10px',
                            marginRight: '10px',
                        }}
                        id="demo-simple-select-helper-label"
                    >
                        Selecione um avatar
                    </InputLabel>
                    <FormControl sx={{ m: 1, width: '96%' }} variant="outlined">
                        {getImages && getImages()}
                    </FormControl>
                    <Divider 
                        style={{
                            marginTop: '20px',
                            marginBottom: '20px',
                        }}
                    />
                    <FormControl sx={{ m: 1, width: '96%' }} variant="outlined">
                        <TextField
                            id="outlined"
                            label="Você tem alguma um @ em alguma rede social?"
                            value={this_social_media || 'Não'}
                            onChange={(e) => this_setSocialMedia(e.target.value)}
                        />
                        <h5 style={{ 
                            marginLeft: '10px',
                            marginRight: '10px',    
                        }}>
                            Com o @, quem quiser te conhecer melhor pode te encontrar em alguma rede social.
                        </h5>
                    </FormControl>
                </List>
            </Dialog>
        </div>
    );
}