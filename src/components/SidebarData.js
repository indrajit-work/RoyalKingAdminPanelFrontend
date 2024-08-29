import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import dashboard from '../images/sidebarIcons/dashboard.png';
import user from '../images/sidebarIcons/user.png';
import password from '../images/sidebarIcons/password.png';
import points from '../images/sidebarIcons/points.png';
import settings from '../images/sidebarIcons/processes.png';
import clear from '../images/sidebarIcons/delete.png';
import message from '../images/sidebarIcons/instant_message.png';
import result from '../images/sidebarIcons/results.png';
import turnover from '../images/sidebarIcons/turnover.png';
import history from '../images/sidebarIcons/history.png';

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: dashboard,
    cName: "sub-nav",
  },
  {
    title: "Change Password",
    path: "/changepassword",
    icon: password,
    cName: "sub-nav",
  },
  {
    title: "User Manager",
    path: "/userManager",
    icon: user,
  },
  {
    title: "Adjust Points",
    path: '/adjustpoints',
    icon: points,    
  },
  {
    title: "Turn over",
    path: "/turnover",
    icon: turnover,
  },
  {
    title: "Ticket History",
    path: "/gameHistory",
    icon: history,
  },
  {
    title: "Game Settings",
    path: "/gamesettings",
    icon: settings,
  },
  {
    title: "Game Result",
    path: "/gameResult",
    icon: result,
  },
  {
    title: "Broadcast Message",
    path: "/broadcastMessage",
    icon: message,
  },
  {
    title: "Clean Data",
    path: "/cleanData",
    icon: clear,
  },
];
