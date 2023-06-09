import { ReactNode, createContext, useContext, useState } from "react";
import { AlertContext } from "./AlertContext";
import { LoadingContext } from "./LoadingContext";
import { axiosSummary } from "../api/requests/user";

export const UserContext = createContext<UserContextType>({
    id: '',
    username: '',
    email: '',
    bio: '',
    avatar: '',
    minimal_score: 0,
    local: '',
    social_media: '',
    hobbies: [],
    preferences: [],
    setUser: () => { },
    getInfo: () => { },
    setBio: () => { },
    setAvatar: () => { },
    setMinimalScore: () => { },
    setLocal: () => { },
    setSocialMedia: () => { },
});

type UserContextType = {
    id: string;
    username: string;
    email: string;
    bio: string;
    avatar: string;
    minimal_score: number;
    local: string;
    social_media: string;
    hobbies: string[];
    preferences: string[];
    setUser: (user: any | null) => void;
    getInfo: () => void;
    setBio: (bio: string) => void;
    setAvatar: (avatar: string) => void;
    setMinimalScore: (minimal_score: number) => void;
    setLocal: (local: string) => void;
    setSocialMedia: (social_media: string) => void;
};

type UserContextProviderProps = {
    children: ReactNode;
};

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');
    const [minimal_score, setMinimalScore] = useState(0);
    const [local, setLocal] = useState('');
    const [social_media, setSocialMedia] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [preferences, setPreferences] = useState([]);

    const { openLoading, closeLoading } = useContext(LoadingContext);
    const { openAlert, closeAlert } = useContext(AlertContext);

    const getInfo = async () => {
        openLoading();
        try {
            const res = await axiosSummary();
            closeAlert();
            setUser(res);
        } catch (error: any) {
            await openAlert(error.response.data.detail, 'error');
        }
        closeLoading();
    }

    function setUser(user: any | null) {
        setId(user.id);
        setUsername(user.username);
        setEmail(user.email);
        setBio(user.bio);
        setAvatar(user.avatar);
        setMinimalScore(user.minimal_score);
        setLocal(user.local);
        setSocialMedia(user.social_media);
        setHobbies(user.hobbies);
    }

    return (
        <UserContext.Provider value={{ 
            id, 
            username, 
            email, 
            bio, 
            avatar, 
            minimal_score, 
            local, 
            social_media, 
            hobbies, 
            preferences, 
            setUser, 
            getInfo,
            setBio,
            setAvatar,
            setMinimalScore,
            setLocal,
            setSocialMedia
        }}>
            {children}
        </UserContext.Provider>
    );
}
