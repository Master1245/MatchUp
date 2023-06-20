import { useContext, useEffect, useState } from "react";

import Navbar from "../../components/navbar/Navbar";
import { BottomButtons } from "../../components/bottom-buttons/BottomButtons";

import { TabJourney } from "../../components/tab-journey/TabJourney";
import { TabChat } from "../../components/tab-chat/TabChat";
import { TabProfile } from "../../components/tab-profile/TabProfile";
import { UserContext } from "../../context/UserContext";

export function Home() {
    const [tab, setTab] = useState('journey');

    const { getInfo } = useContext(UserContext);

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <>
            <Navbar />
            {tab === 'journey' && <TabJourney />}
            {tab === 'profile' && <TabProfile />}
            {tab === 'chats' && <TabChat />}
            <BottomButtons setTab={setTab} />
        </>
    )
}