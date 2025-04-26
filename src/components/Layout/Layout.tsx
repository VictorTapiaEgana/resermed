import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from '../SideBar/SideBAr';
import { useState } from 'react';
import './Layout.css'; // Importa el CSS

const drawerWidthOpen = 240;
const drawerWidthClosed = 70;

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="layout">
      {/* <NavBar /> */}
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
