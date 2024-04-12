import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BsJustify,
  BsFillBellFill,
  BsFillEnvelopeOpenFill,
  BsPersonCircle,
  BsSearch,
} from 'react-icons/bs';
import './Header.scss';

function Header({ openSidebarMenu }) {
  const navigate = useNavigate();
  // 로그인화면에 헤더 미적용
  const locationNow = useLocation();
  if (locationNow.pathname === '/login') return null;

  const accessToken = localStorage.getItem('adminId');
  const isLogin = !!accessToken;

  const handleLogout = () => {
    fetch('http://localhost:8080/admins/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: accessToken,
      },
    }).then(result => {
      if (result.ok) {
        localStorage.removeItem('adminId');
        alert('로그아웃되었습니다');
        navigate('/');
        window.location.reload();
      }
    });
  };

  return (
    <header className="header">
      <div className="menuIcon">
        <BsJustify className="icon" onClick={openSidebarMenu} />
      </div>
      <div className="headerLeft">
        <BsSearch className="icon" />
      </div>
      <div className="headerRight">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeOpenFill className="icon" />
        <BsPersonCircle className="icon" />
        {isLogin ? (
          <button className="logoutBtn" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          ''
        )}
      </div>
    </header>
  );
}

export default Header;
