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
      </div>
    </header>
  );
}

export default Header;
