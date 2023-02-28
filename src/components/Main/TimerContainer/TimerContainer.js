import './TimerContainer.css';
import React, { useState } from 'react';
import Button from './TimerButton/TimerButton';
import Timer from './Timer/Timer';

const TimerContainer = ({}) => {
  const [count, setCount] = useState(1500);
  const [segment, setSegment] = useState('');
  const [pomoCount, setPomoCount] = useState(0);
  const [intervalID, setIntervalID] = useState(0);

  const removeInterval = () => {
    clearInterval(intervalID);
    setIntervalID(null);
  };

  const handleOnOffButton = () => {
    if (intervalID) {
      removeInterval();
      return;
    }

    const myInterval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    setIntervalID(myInterval);
  };

  const handlePomodoroClick = (name) => {
    setCount(60 * 25);
    removeInterval();
    setSegment(name);
  };

  const handleBreakClick = (name) => {
    setCount(60 * 5);
    removeInterval();
    setSegment(name);
  };

  const handleLongBreakClick = (name) => {
    setCount(60 * 20);
    removeInterval();
    setSegment(name);
  };

  const handleSkipClick = (name) => {
    if (segment === 'Break') return handlePomodoroClick('Pomodoro');
    handleBreakClick('Break');
    setPomoCount((prevCount) => prevCount + 1);
  };

  const formattedTime = new Date(count * 1000).toISOString().substr(14, 5);

  return (
    <div className='timer-container'>
      <Button onButtonClick={handlePomodoroClick} name={'Pomodoro'} />
      <Button onButtonClick={handleBreakClick} name={'Break'} />
      <Button onButtonClick={handleLongBreakClick} name={'Long Break'} />
      <Timer time={formattedTime} />
      <Button
        onButtonClick={handleOnOffButton}
        name={intervalID ? 'STOP' : 'START'}
      />

      <Button onButtonClick={handleSkipClick}>⏩</Button>

      {pomoCount}
    </div>
  );
};

export default TimerContainer;

