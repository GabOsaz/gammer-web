import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faChartPie,
  faCogs,
  faDoorOpen
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import logo from './../images/logo.ico';
import { useHistory } from 'react-router-dom';

const navItems = [
  {
    label: 'Registered',
    path: 'registeredSchools',
    icon: faDoorOpen,
    allowedRoles: ['admin']
  },
  {
    label: 'Accepted',
    path: 'acceptedSchools',
    icon: faAddressCard,
    allowedRoles: ['admin']
  },
  {
    label: 'Fix Game',
    path: 'fixGame',
    icon: faCogs,
    allowedRoles: ['admin']
  },
  {
    label: 'Fixtures',
    path: 'fixtures',
    icon: faChartPie,
    allowedRoles: ['admin']
  }
];

const NavItem = ({ navItem }) => {
  const location = useLocation();
  const isCurrentRoute =
    location.pathname === `/${navItem.path}`;
  const classes = classNames({
    'px-2 sm:px-6 justify-center sm:justify-start py-3 rounded-full flex': true,
    'text-gray-600 hover:text-blue-500 transform hover:translate-x-1 transition ease-in-out duration-100': !isCurrentRoute,
    'bg-gradient text-gray-100 shadow-lg': isCurrentRoute
  });
  return (
    <Link to={navItem.path} className={classes}>
      <div className="flex items-center">
        <div className="mr-0 sm:mr-4">
          <FontAwesomeIcon icon={navItem.icon} />
        </div>
        <span className="hidden sm:block">
          {navItem.label}
        </span>
      </div>
    </Link>
  );
};

const NavItemContainer = ({ children }) => (
  <div>{children}</div>
);

const Sidebar = () => {
  const history = useHistory()
  return (
    <section className="h-screen">
      {/* <div onClick={() => history.push('/')} className="w-16 sm:w-24 m-auto cursor-pointer">
        <img src={logo} rel="logo" alt="Logo" />
      </div> */}
      <div onClick={() => history.push('/')} className="w-full flex justify-center items-center mr-1 mb-6">
        <img src={logo} alt="Logo" className='w-10' />
        <h1 className='font-bold text-3xl text-blue-600'> Gammer </h1>
      </div>
      <div className="mt-20">
        {navItems.map((navItem, index) => (
          <NavItemContainer key={index}>
            <NavItem navItem={navItem} />
          </NavItemContainer>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
