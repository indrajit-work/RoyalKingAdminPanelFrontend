import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink,Link, useHistory } from "react-router-dom";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import {AiOutlineMenu} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { getCookie, getRole, logout } from "../utils/auth";
import "./Sidebar.css"
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import logo from '../images/royalKing.png';
import userLogo from '../images/man.png'

const Nav = styled.div`
  background: #15171c;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 9;
`;

const NavIcon = styled(Link)`
  /* margin-left: 1.9rem; */
  font-size: 1.9rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavTitle = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
`

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 250ms;
  z-index: 10;
  opacity: 0.95;
  flex-direction: column;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SidebarTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  border-bottom: 2px solid #fff;
  margin-bottom: 1rem;
  background-color: #111;
`;

const Logo = styled.img`
  width: 70px;
  height: 70px;
  margin-left: 8px;
`;

const UserLogo = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 6px;
`;

const LogoTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: gold;
  margin-left: 4px;
  @media (max-width: 392px) {
    display: none;
  }
`;

const UserInfo = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  `

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [userRole, setUserRole] = useState('')
  const [userName, setUserName] = useState('')
  const [balance, setBalance] = useState()

  const history = useHistory();
  const showSidebar = () => setSidebar(!sidebar);

  //current user
  const loggedUser = getCookie("token");
  console.log("logeed in", loggedUser);

  (async () => {
    const role = await getRole(loggedUser);
    setUserRole(role)
  })();

// const hideSideBar=()=>{
//   setSidebar(false)
// }

  const fetchUserDetails = async () => {
    const res = await axios.get(
      `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/fetchuserbyid?userID=${loggedUser}`
    );
    setUserName(res.data.data.userName)
    setBalance(res.data.data.balance)
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])
  
  
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <AiOutlineMenu onClick={showSidebar} />
            <NavTitle to="/dashboard">
              <Logo src={logo} alt="logo" />
              {!sidebar && <LogoTitle>Royal King Admin</LogoTitle>}
            </NavTitle>
          </NavIcon>
          <h4>
            <Link className="logout" onClick={() => logout(history)} >
              <BiLogOut />
            </Link>
          </h4>
        </Nav>
       
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <SidebarTop>
              <UserInfo>
                <UserLogo src={userLogo} alt="user" />
                <User>
                  <span>{userName}</span>
                  <span style={{fontSize: '12px'}}>Balance: <span style={{color: 'gold'}}>{balance}</span></span>
                </User>
              </UserInfo>
              <NavIcon to="#" className="logo">
                <AiOutlineCloseCircle onClick={showSidebar} />
              </NavIcon>
            </SidebarTop>
            {userRole === 'SUPERADMIN' && SidebarData.map((item, index) => {
              return <SubMenu showSideBar={showSidebar} item={item} key={index} />;
            })}

            {userRole === 'ADMIN' && SidebarData.slice(0, 7).map((item, index) => {
              return <SubMenu showSideBar={showSidebar} item={item} key={index} />;
            })}
            {userRole === 'Distributor' && SidebarData.slice(1, 5).map((item, index) => {
              return <SubMenu showSideBar={showSidebar} item={item} key={index} />;
            })}
            {userRole === 'STOKIST' && SidebarData.slice(1, 5).map((item, index) => {
              return <SubMenu showSideBar={showSidebar} item={item} key={index} />;
            })}
          </SidebarWrap>

          {/* {userRole !== 'SUPERADMIN' && <UserInfo>
            <p style={{marginBottom: '4px'}}>Username: 
              <span style={{fontWeight: 'bold'}}> {userName}</span>
            </p>
          </UserInfo>} */}
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
