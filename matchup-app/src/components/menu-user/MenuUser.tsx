import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { WordLanguage } from "../Language/Language";

export default function MenuUser() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360 }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={<WordLanguage text="General Configurations" />} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary={<WordLanguage text="Search Preferences" />} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary={<WordLanguage text="Privacy Policy" />} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  )
}