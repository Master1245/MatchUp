import { useState } from "react";

import Navbar from "../../components/navbar/Navbar";
import { BottomButtons } from "../../components/bottom-buttons/BottomButtons";

import { TabJourney } from "../../components/tab-journey/TabJourney";
import { TabChat } from "../../components/tab-chat/TabChat";
import { TabProfile } from "../../components/tab-profile/TabProfile";
import { axiosSummary } from "../../api/requests/summary";

export function Home() {
    const [tab, setTab] = useState('journey');

    const test = async () => {
        try {
            const res = await axiosSummary();
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };
    console.log(test());
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