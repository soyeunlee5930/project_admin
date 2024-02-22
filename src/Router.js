import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import User from './pages/User/User';

const Router = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const openSidebarMenu = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header openSidebarMenu={openSidebarMenu} />
        <Sidebar openSidebar={openSidebar} openSidebarMenu={openSidebarMenu} />
        <Routes>
          <Route path="/admins" element={<Home />} />
          <Route path="/admins/login" element={<Login />} />
          <Route path="/admins/user" element={<User />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
