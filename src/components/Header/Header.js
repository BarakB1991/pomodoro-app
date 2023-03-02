import './Header.css';
import React from 'react';
import Settings from './Settings/Settings';

const Header = () => {
  return (
    <header>
      <h1 className='header__title'>Pomodoro</h1>
      <Settings />
    </header>
  );
};

export default Header;

