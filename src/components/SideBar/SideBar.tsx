import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Info, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './SideBar.css';

const drawerWidthOpen = 240;
const drawerWidthClosed = 70;

interface SideBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function SideBar({ open, setOpen }: SideBarProps) {

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidthOpen : drawerWidthClosed,
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <div className="sidebar-toggle">
        <IconButton onClick={toggleDrawer}>
          <Menu />
        </IconButton>
      </div>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/reservas">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            {open && <ListItemText primary="Reservas" />}
          </ListItemButton>
        </ListItem>

        {/* <ListItem disablePadding>
          <ListItemButton component={Link} to="/about">
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            {open && <ListItemText primary="Acerca de" />}
          </ListItemButton>
        </ListItem> */}
      </List>
    </Drawer>
  );
}

export default SideBar;
