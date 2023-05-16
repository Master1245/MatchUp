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
import { Auth } from '../../context/AuthContext';
import { useContext } from 'react';

export const Navegation: React.FC = () => {
    const { isAuthenticated } = useContext(Auth);

    const checkAuth = (element: JSX.Element) => {
        if (isAuthenticated) {
        return element;
        } else {
        return <Navigate to="/permission-denied" replace />;
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={checkAuth(<Home />)} />
                <Route path="/register" element={checkAuth(<Register />)} />
                <Route path="/profile" element={checkAuth(<Profile />)} />
                <Route path="/more-info" element={checkAuth(<MoreInfo />)} />
                <Route path="/hobbie" element={checkAuth(<Hobbie />)} />
                <Route path="/chats" element={checkAuth(<Chats />)} />
                <Route path="/chat-room" element={checkAuth(<ChatRoom />)} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};