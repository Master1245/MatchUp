import { Box, Grid, styled } from "@mui/material";

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: '#dddddd',
    padding: theme.spacing(1),
  }));
type RenderCommentProps = {
    id: number;
    name: string;
    comment: string;
}
export function RenderComment({
    id, name, comment
}: RenderCommentProps) {
    return (
        <Box sx={{
            flexGrow: 1,
            marginLeft: '15px',
          }}>
            <Grid container 
                spacing={2}
                border={1}
                borderColor="grey.500"
                borderRadius={1}
            >
              <Grid xs={12}>
                    <h3
                        style={{ padding: '10px', fontWeight: 'bold', color: '#777' }} 
                    >
                        Avalie o seguinte comentário...
                    </h3>
                    <Div
                        style={{ padding: '40px' }}
                    >
                        <h3
                            style={{ fontWeight: 'bold', color: '#777', padding: '0', margin: '0' }}
                        >Hobbie:</h3>
                        <h2
                            style={{padding: '0', margin: '0' }}
                        >{name}</h2>
                        <p className="comment-comment">{comment}</p>
                    </Div>
                </Grid>
            </Grid>
        </Box>
    );
};