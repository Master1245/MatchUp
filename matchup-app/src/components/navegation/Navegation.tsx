import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navigate, Routes } from 'react-router';
import { useContext, useState } from 'react';

import { Login } from '../../pages/login/Login';
import { Home } from '../../pages/home/Home';
import { Register } from '../../pages/register/Register';
import { MoreInfo } from '../../pages/more-info/MoreInfo';
import { Hobbie } from '../../pages/hobbie/Hobbie';
import { ChatRoom } from '../../pages/chat-room/ChatRoom';

import { PrivacyPolicy } from '../../pages/privacy-policy/PrivacyPolicy';

import { AuthContext } from '../../context/AuthContext';

export const Navegation: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [pageWithPermission, setPageWithPermission] = useState(false);

    const checkAuth = (element: JSX.Element) => {
        if (isAuthenticated){
            //setPageWithPermission(true); todo
            return element;
        }
        return <Navigate to="/" replace />;
    }

    const haveAuth = (element: JSX.Element) => {
        if (isAuthenticated === false){
            //setPageWithPermission(false); todo
            return element;
        }
        return <Navigate to="/home" replace />;
    }
      
    return (
        <Router>
            <Routes>
                <Route path="/" element={haveAuth(<Login />)} />
                <Route path="/home" element={checkAuth(<Home />)} />
                <Route path="/register" element={haveAuth(<Register />)} />
                <Route path="/more-info" element={checkAuth(<MoreInfo />)} />
                <Route path="/hobbie" element={checkAuth(<Hobbie />)} />
                <Route path="/chat-room" element={checkAuth(<ChatRoom />)} />

                <Route path='/privacy-policy' element={<PrivacyPolicy />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};