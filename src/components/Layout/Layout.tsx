import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar.jsx';
import { useState } from 'react';
import './Layout.css'; 

const drawerWidthOpen = 10;
const drawerWidthClosed = 10;

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="layout">      
      <div className="layout-body">
        <SideBar open={open} setOpen={setOpen} />
        <main
          className="layout-main"
          style={{
            marginLeft: open ? drawerWidthOpen : drawerWidthClosed,
          }}
        >
          <Outlet />
          
        </main>
      </div>
    </div>
  );
}

export default Layout;
