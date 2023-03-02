import React, { useState } from 'react';
import useSound from 'use-sound';
import './OnOffButton.css';
import onClick from '../../../../sounds/on-click.mp3';
import offClick from '../../../../sounds/off-click.mp3';

const OnOffButton = ({ name, onButtonClick }) => {
  const [isChecked, setIsChecked] = useState(false);

  const [playON] = useSound(onClick, {
    volume: 0.5,
  });

  const [playOFF] = useSound(offClick, {
    volume: 0.5,
  });

  const handleClick = () => {
    console.log(3);
    onButtonClick(name);
    !isChecked ? playON() : playOFF();
    setIsChecked(!isChecked);
  };
  return (
    <button onClick={handleClick} className='button button__primary'>
      {name}
    </button>
  );
};

export default OnOffButton;

