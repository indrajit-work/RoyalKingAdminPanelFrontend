import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoIcons.IoIosPaper />,
    cName: "sub-nav",
  },
  {
    title: "Change Password",
    path: "/changepassword",
    icon: <IoIcons.IoIosPaper />,
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
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: "Adjust Points",
    path: '/adjustpoints',
    icon: <FaIcons.FaCartPlus />,
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
    title: "Ticket History",
    path: "/gameHistory",
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: "Turn over",
    path: "/turnover",
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: "Game Settings",
    path: "/gamesettings",
    icon: <IoIcons.IoMdPeople />,
  },
  {
    title: "Game Result",
    path: "/gameResult",
    icon: <IoIcons.IoMdHelpCircle />,
  },
  {
    title: "Broadcast Message",
    path: "/broadcastMessage",
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: "Clean Data",
    path: "/cleanData",
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
];
