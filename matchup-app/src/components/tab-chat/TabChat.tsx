import { useEffect, useState } from "react";
import { axiosGetConnections } from "../../api/requests/match";
import { Avatar } from "@mui/material";

export function TabChat() {
    const [connections, setConnections] = useState<JSX.Element[]>([]);

    function buildConnections(list: any) {
        console.log(list);
        const connectionsList = list.map((connection: any) => {
            return (
                <div key={connection.id}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                        borderRadius: '10px',
                        margin: '10px',
                        padding: '20px',
                    }}
                >
                    <Avatar
                        alt="Remy Sharp"
                        src={connection.avatar}
                        sx={{ width: 80, height: 80 }}
                    />
                    <div>{connection.username}</div>
                    <div
                        style={{
                            maxWidth: '110px',
                        }}
                    >
                        <a href={connection.social_media ? connection.social_media : '#'} style={{ marginLeft: '5px' }}>
                            @{connection.social_media.includes('facebook') ? 'Facebook' : connection.social_media.includes('instagram') ? 'Instagram' : connection.social_media.includes('twitter') ? 'Twitter' : 'Não possui'}
                        </a>
                    </div>
                </div>
            )
        })
        setConnections(connectionsList);
    }


    async function getConnections() {
        try {
            const result = await axiosGetConnections();

            buildConnections(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getConnections();
        console.log(connections);
    }, []);
    return (
        <>
            <h2
                style={{
                    marginLeft: '10px',
                }}
            >Matchs:</h2>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    marginTop: '10px',
                }}
            >
                {connections ? connections : <div>no connections</div>}
            </div>
        </>
    )
}