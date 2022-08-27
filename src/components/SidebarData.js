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
    path: '/overview',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Change Passowrd',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: 'User Manager',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Admin',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Distributor ',
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