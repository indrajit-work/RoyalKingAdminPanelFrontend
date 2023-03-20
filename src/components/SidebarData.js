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
  // {
  //   title: "Profile",
  //   path: "#",
  //   icon: <AiIcons.AiFillHome />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: "Change Username",
  //       path: "/profile/username",
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //     {
  //       title: "Change Passowrd",
  //       path: "/profile/changepassword",
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Admin',
  //   icon: <FaIcons.FaCartPlus />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //       {
  //         title: 'Add Admin',
  //         path: '/regAdmin',
  //         icon: <IoIcons.IoIosPaper />,
  //         cName: 'sub-nav'
  //       },
  //       {
  //         title: ' List Admin',
  //         path: '/listAdmin',
  //         icon: <AiIcons.AiOutlineBars />,
  //         cName:'sub-nav'
  //       },
  //   ]
  //   },
  // {
  //   title: 'Distributor',
  //   icon: <IoIcons.IoIosPaper />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'List Distributor',
  //       path: '/distributor/list',
  //       icon: <AiIcons.AiOutlineBars />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'Add Distributor ',
  //       path: '/distributor/create',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //   ]
  // },
  // {
  //   title: 'Stokist',
  //   icon: <IoIcons.IoIosPaper />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'List Stokist',
  //       path: '/stokist/list',
  //       icon: <AiIcons.AiOutlineBars />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'Add Stokist ',
  //       path: '/stokist/create',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //   ]
  // },
  // {
  //   title: 'Player',
  //   icon: <IoIcons.IoIosPaper />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'List Player',
  //       path: '/player/list',
  //       icon: <AiIcons.AiOutlineBars />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'Add Player ',
  //       path: '/player/create',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //   ]
  // },
  {
    title: "User Manager",
    path: "/userManager",
    icon: user,
  },
  {
    title: "Adjust Points",
    path: '/adjustpoints',
    icon: points,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
    // subNav: [
    //   {
    //     title: "Admin",
    //     path: "/adjustpointsAdmin",
    //     icon: <IoIcons.IoIosPaper />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "Distributor",
    //     path: "/adjustpointDistributor",
    //     icon: <IoIcons.IoIosPaper />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "Stokist",
    //     path: "/adjustpointStokist",
    //     icon: <IoIcons.IoIosPaper />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "Player",
    //     path: "/adjustpointPlayers",
    //     icon: <IoIcons.IoIosPaper />,
    //     cName: "sub-nav",
    //   },
    // ],
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
