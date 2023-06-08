import React from 'react';
import useSound from 'use-sound';
import './OnOffButton.css';
import onClick from '../../../../sounds/on-click.mp3';
import offClick from '../../../../sounds/off-click.mp3';

const OnOffButton = ({ name, onButtonClick, intervalID }) => {
  const [playON] = useSound(onClick, {
    volume: 0.5,
  });

  const [playOFF] = useSound(offClick, {
    volume: 0.5,
  });
  console.dir(playON);
  const handleClick = () => {
    onButtonClick(name);
    debugger;
    intervalID ? playON() : playOFF();
  };

  return (
    <button
      onClick={handleClick}
      className={`button button__primary${
        intervalID ? ' button__primary_active' : ''
      }`}
    >
      {name}
    </button>
  );
};

export default OnOffButton;

