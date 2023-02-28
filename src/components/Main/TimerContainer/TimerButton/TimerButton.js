import React from 'react';

const TimerButton = ({ name, onButtonClick }) => {
  const handleClick = () => {
    onButtonClick(name);
  };

  return <button onClick={handleClick}>{name}</button>;
};

export default TimerButton;

