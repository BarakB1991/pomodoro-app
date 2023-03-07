import './Header.css';
import React from 'react';
import Settings from './Settings/Settings';

const Header = () => {
  return (
    <header className='header'>
      <h1 className='header__title'>Pomodoro</h1>
      <div>
        <Settings />
      </div>
    </header>
  );
};

export default Header;

