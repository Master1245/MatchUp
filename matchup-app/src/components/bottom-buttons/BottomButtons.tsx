import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState, SyntheticEvent, useEffect } from "react";

import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

import { TextLanguage } from "../Language/Language";

export function BottomButtons({ setTab }: { setTab: Function}) {
  const [value, setValue] = useState('journey');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTab(newValue);
  };

  return (
    <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
          <BottomNavigationAction
            label={<TextLanguage text="Chats" />}
            value="chats"
            icon={<ModeCommentIcon />}
          />
        <BottomNavigationAction
          label={<TextLanguage text="Journey" />}
          value="journey"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label={<TextLanguage text="Profile" />}
          value="profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}