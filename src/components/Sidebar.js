import React, { useState } from "react";
import styled from "styled-components";
import { NavLink,Link, useHistory } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as DiIcons from "react-icons/di";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { logout } from "../utils/auth";
import "./Sidebar.css"
import {   BsBoxArrowInLeft } from "react-icons/bs";
const Nav = styled.div`
  background: #15171c;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 1.9rem;
  font-size: 1.9rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 240px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 250ms;
  z-index: 10;
  opacity: 0.95;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const history = useHistory();
  const showSidebar = () => setSidebar(!sidebar);

const hideSideBar=()=>{
  setSidebar(false)
}
  
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <h4 className=" ml-auto mr-5  ">
            <Link  className=" logout" onClick={() => logout(history)} >
              Logout
            </Link>
          </h4>
        </Nav>
       
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#" className="logo">
              <BsBoxArrowInLeft onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu showSide={hideSideBar} showSideBar={showSidebar} item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
