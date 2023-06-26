import { Avatar, Box, Grid, Paper, styled } from "@mui/material";
import InstagramEmbed from 'react-instagram-embed';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '86%',
  color: theme.palette.text.secondary,
}));
type RenderProfileProps = {
  id: number;
  username: string | undefined;
  bio: string | undefined;
  avatar: string | undefined;
  local: string | undefined;
  social_media: string | undefined;
}
export function RenderProfile({
  id, username, bio, avatar, local, social_media
}: RenderProfileProps) {
  var embed = undefined;
  // if (social_media?.includes('instagram.com')) {
  //   embed = (
  //     <InstagramEmbed
  //       url={social_media}
  //       clientAccessToken="<seu_access_token>"
  //       maxWidth={320}
  //       hideCaption={false}
  //       containerTagName="div"
  //       protocol=""
  //       injectScript
  //     />
  //   )
  // }

  return (
    <div className="profile" key={id}>
      <Box sx={{
        flexGrow: 1,
        marginLeft: '15px',
      }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <Item>

              {avatar &&
                <Avatar
                  alt="Remy Sharp"
                  src={avatar}
                  sx={{ width: 120, height: 120 }}
                />}
            </Item>
          </Grid>
          <Grid xs={8}>
            <Item>
              <p className="profile-username"
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  margin: '10px',
                }}
              >
                {username ? username : 'Nome não conhecido'}
              </p>
            </Item>
          </Grid>
          <Grid xs={12}>
            <Item>
              <Div>
                {
                  bio && <p className="profile-bio">{bio ? bio : 'Bio não conhecida'}</p>
                }
              </Div>
            </Item>
          </Grid>
          <Grid xs={12}>
            <Item>
              <>
                {
                  embed ? embed : social_media ? social_media : 'Rede social não conhecida'
                }
              </>
            </Item>
          </Grid>

          <Grid xs={12} mt={2}>
            <Item>
              <p className="profile-local">
                {local ? local : 'Local anonimo'}
              </p>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div >
  );
}