import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
{
    title: 'Profile',
    path: '#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Change Passowrd',
        path: '/profile/changepassword',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: 'Distributor',
    // path: '',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'List Distributor',
        path: '/distributor/list',
        icon: <AiIcons.AiOutlineBars />,
        cName: 'sub-nav'
      },
      {
        title: 'Add Distributor ',
        path: '/distributor/create',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'Stokist',
    // path: '',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'List Stokist',
        path: '/stokist/list',
        icon: <AiIcons.AiOutlineBars />,
        cName: 'sub-nav'
      },
      {
        title: 'Add Stokist ',
        path: '/stokist/create',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'Player',
    // path: '',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'List Player',
        path: '/player/list',
        icon: <AiIcons.AiOutlineBars />,
        cName: 'sub-nav'
      },
      {
        title: 'Add Player ',
        path: '/player/create',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'Adjust Points',
    // path: '',
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
          title: 'Admin',
          path: '/adjustpointsAdmin',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
        {
          title: 'Distributor',
          path: '/adjustpointDistributor',
          icon: <IoIcons.IoIosPaper />,
          cName:'sub-nav'
        },
        {
          title: 'Stokist',
          path: '/adjustpointStokist',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
        {
          title: 'Player',
          path: '/adjustpointPlayers',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
      ]
  },
  {
    title: 'Game Settings',
    path: '/gamesettings',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Turn over',
    path: '/turnover',
    icon: <FaIcons.FaEnvelopeOpenText />,

  },
  {
    title: 'Ticket History',
    path: '/gameHistory',
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Game Result',
    path: '/gameResult',
    icon: <IoIcons.IoMdHelpCircle />
  },
  {
    title: 'Broadcast Message',
    path: '/broadcastMessage',
    icon: <FaIcons.FaEnvelopeOpenText />,
  }
];