import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navigate, Routes } from 'react-router';

import { Login } from '../../pages/login/Login';
import { Home } from '../../pages/home/Home';
import { Register } from '../../pages/register/Register';
import { Profile } from '../../pages/profile/Profile';
import { MoreInfo } from '../../pages/more-info/MoreInfo';
import { Hobbie } from '../../pages/hobbie/Hobbie';
import { Chats } from '../../pages/chats/Chats';
import { ChatRoom } from '../../pages/chat-room/ChatRoom';
import { AuthProvider } from '../../context/AuthContext';

export const Navegation: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/more-info" element={<MoreInfo />} />
                    <Route path="/hobbie" element={<Hobbie />} />
                    <Route path="/chats" element={<Chats />} />
                    <Route path="/chat-room" element={<ChatRoom />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};