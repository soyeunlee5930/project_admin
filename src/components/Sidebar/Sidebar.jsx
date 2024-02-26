import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsPeopleFill,
  BsListCheck,
} from 'react-icons/bs';
import { BiSolidCategory } from 'react-icons/bi';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { FaShoppingBasket } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';
import { TbUserQuestion } from 'react-icons/tb';
import { RiAdminFill } from 'react-icons/ri';
import './Sidebar.scss';

function SideBar({ openSidebar, openSidebarMenu }) {
  return (
    <aside id="sidebar" className={openSidebar ? 'sidebarResponsive' : ''}>
      <div className="sidebarTitle">
        <div className="sidebarAdmin">ADMIN</div>
        <span className="icon closeIcon" onClick={openSidebarMenu}>
          X
        </span>
      </div>
      <ul className="sidebarList">
        <li className="sidebarListItem">
          <Link to="/admins">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="/admins/user">
            <BsPeopleFill className="icon" /> Users
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="/admins/categories">
            <BiSolidCategory className="icon" /> Categories
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="">
            <BiSolidCategoryAlt className="icon" /> Sub-Categories
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="/admins/products">
            <BsFillArchiveFill className="icon" /> Products
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="">
            <BsListCheck className="icon" /> Inventory
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="">
            <FaShoppingBasket className="icon" /> Orders
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="">
            <TfiWrite className="icon" /> Notices
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="">
            <TbUserQuestion className="icon" /> QnA
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="">
            <RiAdminFill className="icon" /> Admins
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
