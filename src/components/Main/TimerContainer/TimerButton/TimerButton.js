import './TimerButton.css';
import React from 'react';

const TimerButton = ({ name, onButtonClick, clickedButton = '' }) => {
  const handleClick = () => {
    onButtonClick(name);
  };

  return (
    <button
      className={`button button__secondary ${clickedButton}`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default TimerButton;

