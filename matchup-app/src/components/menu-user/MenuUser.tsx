import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { WordLanguage } from "../Language/Language";
import Preferences from "../preferences/Preferences";
import Configurations from "../configurations/Configurations";

export default function MenuUser() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360 }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <Configurations>
              <ListItemButton>
                <ListItemText primary={<WordLanguage text="General Configurations" />} />
              </ListItemButton>
            </Configurations>
          </ListItem>
          <ListItem disablePadding>
            <Preferences>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary={<WordLanguage text="Search Preferences" />} />
              </ListItemButton>
            </Preferences>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/privacy-policy" target="_blank">
              <ListItemText primary={<WordLanguage text="Privacy Policy" />} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  )
}