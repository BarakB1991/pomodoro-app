import React from 'react';
import './Settings.css';

const Settings = () => {
  const handleButtonClick = () => {
    console.log('stings');
  };
  return (
    <button onClick={handleButtonClick} className='settings'>
      ⚙️
    </button>
  );
};

export default Settings;

