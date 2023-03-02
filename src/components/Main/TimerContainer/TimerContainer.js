import './TimerContainer.css';
import React, { useCallback, useEffect, useState } from 'react';
import Button from './TimerButton/TimerButton';
import Timer from './Timer/Timer';
import OnOffButton from './OnOffButton/OnOffButton';
import useSound from 'use-sound';
import onClick from '../../../sounds/on-click.mp3';
import finishSound from '../../../sounds/finish-timer.mp3';
import startSound from '../../../sounds/start-timer.mp3';

const TimerContainer = ({
  setPomoCount,
  pomoCount,
  handleIncreasePomoCount,
  timerMinutes,
}) => {
  const [count, setCount] = useState(1);
  const [segment, setSegment] = useState('Pomodoro');
  const [intervalID, setIntervalID] = useState(null);

  console.log('intervalID(inFunc Comp): ' + intervalID);

  const [playON] = useSound(onClick, {
    volume: 0.5,
  });

  const [playFinishTimer] = useSound(finishSound, {
    volume: 0.5,
  });

  const [playStartTimer] = useSound(startSound, {
    volume: 0.5,
  });

  const removeInterval = useCallback(() => {
    clearInterval(intervalID);
    setIntervalID(null);
  }, [intervalID]);

  const increasePomo = useCallback(() => {
    handleIncreasePomoCount();
  }, [handleIncreasePomoCount]);

  const handleButtonClick = useCallback(
    (mode) => {
      console.log("I'm in handleButtonClick");
      setCount(60 * timerMinutes[mode]);
      if (
        intervalID
        // && !isAutoStart
      )
        removeInterval();

      setSegment(mode);
    },
    [timerMinutes, removeInterval, intervalID],
  );

  const changeSegmentBasedOnPomodoros = useCallback(() => {
    console.log('56pomoCount: ' + pomoCount);

    pomoCount % 4 === 0 && pomoCount !== 0
      ? handleButtonClick('Long Break')
      : handleButtonClick('Break');
  }, [handleButtonClick, pomoCount]);

  const handleOnOffButton = () => {
    if (intervalID) {
      removeInterval();
      return;
    }

    const myInterval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    setIntervalID(() => myInterval);
    console.log('intervalID(inHOOBf): ' + intervalID);
  };

  const handleSkipClick = () => {
    playON();
    if (segment === 'Break' || segment === 'Long Break')
      return handleButtonClick('Pomodoro');
    changeSegmentBasedOnPomodoros();
    //  only if timer is running account for the pomodoro
    intervalID && setPomoCount((prevCount) => prevCount + 1);
  };

  const formattedTime = new Date(count * 1000).toISOString().substr(14, 5);

  useEffect(() => {
    if (count === -1) {
      // !isAutoStart &&
      removeInterval();
      setCount((prevCount) => prevCount + 1);
      let num = Math.round(Math.random() * 9);
      if (segment === 'Pomodoro') {
        console.log('foo ', num);
        increasePomo();
        changeSegmentBasedOnPomodoros();
        playFinishTimer();
      } else if (segment === ('Break' || 'Long Break')) {
        console.log('boo ', num);
        handleButtonClick('Pomodoro');
        playStartTimer();
      }
    }
  }, [
    increasePomo,
    count,
    playFinishTimer,
    playStartTimer,
    segment,
    timerMinutes,
    removeInterval,
    changeSegmentBasedOnPomodoros,
    handleButtonClick,
    // isAutoStart,
  ]);

  return (
    <div className='timer-container'>
      <h3>{segment}</h3>
      <div className='timer-container__segment-buttons'>
        <Button onButtonClick={handleButtonClick} name={'Pomodoro'} />
        <Button onButtonClick={handleButtonClick} name={'Break'} />
        <Button onButtonClick={handleButtonClick} name={'Long Break'} />
      </div>
      <Timer time={formattedTime} />
      <OnOffButton
        onButtonClick={handleOnOffButton}
        name={intervalID ? 'STOP' : 'START'}
      />
      {intervalID && (
        <Button onButtonClick={handleSkipClick} name={'⏩'}></Button>
      )}
    </div>
  );
};

export default TimerContainer;

