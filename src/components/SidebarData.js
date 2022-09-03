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
        path: '/stokist/create',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'Adjust Points',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
          title: 'Distributor',
          path: '/reports/reports2',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
        {
          title: 'Stockist',
          path: '/reports/reports3',
          icon: <IoIcons.IoIosPaper />
        }
      ]
  },
  {
    title: 'Game history',
    path: '/team',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Turn over',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

  },
  {
    title: 'Clean Game data',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  },
  {
    title: 'Broadcast Message',
    path: '/support',
    icon: <FaIcons.FaEnvelopeOpenText />,
  }
];