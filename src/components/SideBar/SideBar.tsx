import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Info, Menu, EditNote  } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import MenuItems from './SideBar'
import './SideBar.css';

const drawerWidthOpen = 180;
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

        {
          MenuItems && MenuItems.map((item,index) =>{
            const Icono = item.icono;

            return(
                    <ListItem disablePadding key={index}>
                  
                      <ListItemButton sx={{'&:hover': {
                                            backgroundColor: '#1e55ec24',
                                          },
                                        }}
                                      component={Link} to={ item.link } >
                        <ListItemIcon>
                          <Icono /> 
                        </ListItemIcon>
                        {open && <ListItemText primary={ item.nombre} />}
                      </ListItemButton>
          
                  </ListItem>
            )
          })
        }
        
      </List>
    </Drawer>
  );
}

export default SideBar;
