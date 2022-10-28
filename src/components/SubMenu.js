import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCookie, getRole } from '../utils/auth';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  list-style: none;
  height: 39px;
  text-decoration: none;
  font-size: 12px;
  &:hover {
    background: #252831;
    text-decoration:none;
    border-left: 4px solid #632ce4;
    cursor: pointer;
    font-size:14px;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;


const DropdownLink = styled(Link)`
  background: #414757;
  height: 50px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none ;
  color: #f5f5f5;
  font-size: 15px;
  &:hover {
    background: #a9abafff;
    text-decoration:none;
    cursor: pointer;
  }
`;

const SubMenu = ({ item ,showSide,showSideBar}) => {
  const [subnav, setSubnav] = useState(false);
  const [loggedUserRole, setloggedUserRole] = useState('')
// const[showSide,setShowSide]=useState(true);

// const showingSide=()=>setShowSide(!showSide)
  const showSubnav = () => setSubnav(!subnav);

  // get loggedin user id
  const loggedUser = getCookie("token");

  // get logged user role
  (async () => {
      const role = await getRole(loggedUser);
      setloggedUserRole(role)
  })();

  // console.log(item)
  // onClick={showSideBar}
  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>

      {subnav && item.title === 'Profile' && loggedUserRole === 'SUPERADMIN' && item.subNav.map((menu, index) => {
        return (
          <DropdownLink to={menu.path} key={index} onClick={showSideBar}>
            {menu.icon}
            <SidebarLabel>{menu.title}</SidebarLabel>
          </DropdownLink>
        );
      })}
      {/* {item.title === 'Profile' && loggedUserRole === 'ADMIN' && 
        <DropdownLink to={item.subnav.slice(-1).path} onClick={showSideBar}>
          {item.subnav.slice(-1).icon}
          <SidebarLabel>{item.subnav.slice(-1).title}</SidebarLabel>
        </DropdownLink>
      } */}
      {/* {item.title === 'Profile' && loggedUserRole === 'Distributor' && 
        <DropdownLink to={item.slice(-1).path} onClick={showSideBar}>
          {item.slice(-1).icon}
          <SidebarLabel>{item.slice(-1).title}</SidebarLabel>
        </DropdownLink>
      }
      {item.title === 'Profile' && loggedUserRole === 'STOKIST' && 
        <DropdownLink to={item.subnav.slice(-1).path} onClick={showSideBar}>
          {item.subnav.slice(-1).icon}
          <SidebarLabel>{item.subnav.slice(-1).title}</SidebarLabel>
        </DropdownLink>
      } */}
      {/* {subnav && item.title === 'Profile' && loggedUserRole !== 'SUPERADMIN' && item.subNav.splice(0, 1).map((item, index) => {
        return (
          <DropdownLink to={item.path} key={index} onClick={showSideBar}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </DropdownLink>
        );
      })} */}
      {/* {subnav && item.title === 'Profile' && loggedUserRole === 'STOKIST' && item.subNav.slice(0, 1).map((item, index) => {
        return (
          <DropdownLink to={item.path} key={index} onClick={showSideBar}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </DropdownLink>
        );
      })} */}
      {/* {subnav && item.title === 'Profile' && loggedUserRole === 'ADMIN' && item.subNav.map((item, index) => {
        console.log(item)
        return (
          <DropdownLink to={item.path} key={index} onClick={showSideBar}>
            {item.icon}
            <SidebarLabel>{item.title}oo</SidebarLabel>
          </DropdownLink>
        );
      })} */}
 
      {/* {subnav && item.title === 'Adjust Points' && loggedUserRole === 'SUPERADMIN' && item.subNav.map((item, index) => {
        return (
          <DropdownLink to={item.path} key={index} onClick={showSideBar}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </DropdownLink>
        );
      })}
      {subnav && loggedUserRole === 'ADMIN' && item.subNav.slice(1).map((item, index) => {
        return (
          <DropdownLink to={item.path} key={index} onClick={showSideBar}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </DropdownLink>
        );
      })}
      {subnav && loggedUserRole === 'Distributor' && item.subNav.slice(2).map((item, index) => {
        return (
          <DropdownLink to={item.path} key={index} onClick={showSideBar}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </DropdownLink>
        );
      })}
      {subnav && loggedUserRole === 'STOKIST' && item.subNav.length === 4 && item.subNav.slice(3).map((item, index) => {
        return (
          <DropdownLink to={item.path} key={index} onClick={showSideBar}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </DropdownLink>
        );
      })} */}
    </>
  );
};

export default SubMenu;