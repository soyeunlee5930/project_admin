import { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const openSidebarMenu = () => {
    setOpenSidebar(!openSidebar);
  };

  const accessToken = localStorage.getItem('adminId');
  const isLogin = !!accessToken;

  return isLogin ? (
    <div className="gridContainer">
      <Header openSidebarMenu={openSidebarMenu} />
      <Sidebar openSidebar={openSidebar} openSidebarMenu={openSidebarMenu} />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainLayout;
