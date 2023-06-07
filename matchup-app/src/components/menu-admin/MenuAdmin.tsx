import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { WordLanguage } from "../language/Language";
import AddHobbie from "../add-hobbie/AddHobbie";
import AddPreference from "../add-preference/AddPreference";

export default function MenuAdmin() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360 }}>
    <Divider />
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <AddHobbie>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={<WordLanguage text="Add Hobbie" />} />
              </ListItemButton>
            </AddHobbie>
          </ListItem>
          <ListItem disablePadding>
            <AddPreference>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={<WordLanguage text="Add Preference" />} />
              </ListItemButton>
            </AddPreference>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}