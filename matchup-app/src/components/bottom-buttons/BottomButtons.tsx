import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState, SyntheticEvent } from "react";

import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

import { WordLanguage } from "../Language/Language";

import './bottom-buttons.styles.scss';

export function BottomButtons({ setTab }: { setTab: Function}) {
  const [value, setValue] = useState('journey');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTab(newValue);
  };

  return (
    <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        sx={{ 
          width: 'auto', 
          height: '4rem',
        }} 
        value={value} 
        onChange={handleChange}>
          <BottomNavigationAction
            label={<WordLanguage text="Chats" />}
            value="chats"
            icon={<ModeCommentIcon />}
            className="chats-button"
          />
        <BottomNavigationAction
          label={<WordLanguage text="Journey" />}
          value="journey"
          icon={<FavoriteIcon />}
          className="journey-button"
        />
        <BottomNavigationAction
          label={<WordLanguage text="Profile" />}
          value="profile"
          icon={<PersonIcon />}
          className="profile-button"
        />
      </BottomNavigation>
    </Paper>
  );
}