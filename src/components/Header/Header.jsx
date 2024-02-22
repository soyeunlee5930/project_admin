import React from 'react';
import {
  BsJustify,
  BsFillBellFill,
  BsFillEnvelopeOpenFill,
  BsPersonCircle,
  BsSearch,
} from 'react-icons/bs';
import './Header.scss';

function Header({ openSidebarMenu }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={openSidebarMenu} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeOpenFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default Header;
