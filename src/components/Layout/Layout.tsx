import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar.jsx';
import { useState } from 'react';
import './Layout.css'; 
import { Box } from '@mui/material';

const drawerWidthOpen = 10;
const drawerWidthClosed = 10;

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <Box className="layout">      
      <Box className="layout-body">
        <SideBar open={open} setOpen={setOpen} />
        <main
          className="layout-main"
          style={{
            marginLeft: open ? drawerWidthOpen : drawerWidthClosed,
          }}
        >
          <Outlet />
          
        </main>
      </Box>
    </Box>
  );
}

export default Layout;
