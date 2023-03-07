import './TimerContainer.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from './TimerButton/TimerButton';
import Timer from './Timer/Timer';
import OnOffButton from './OnOffButton/OnOffButton';
import useSound from 'use-sound';
import onClick from '../../../sounds/on-click.mp3';
import finishSound from '../../../sounds/finish-timer.mp3';
import startSound from '../../../sounds/start-timer.mp3';
import { BsFillSkipEndFill } from 'react-icons/bs';

const TimerContainer = ({
  setPomoCount,
  pomoCount,
  handleIncreasePomoCount,
  timerMinutes,
}) => {
  const buttonsContainerRef = useRef(null);
  const [count, setCount] = useState(1);
  const [segment, setSegment] = useState('Pomodoro');
  const [intervalID, setIntervalID] = useState(null);
  const [isSmallerButtons, setIsSmallerButtons] = useState(false);

  // console.log(buttonsContainerRef.current);
  useEffect(() => {
    if (!buttonsContainerRef.current) return;

    function handleResize() {
      if (buttonsContainerRef.current.offsetWidth < 333) {
        setIsSmallerButtons((currentState) => (currentState = true));
      } else {
        setIsSmallerButtons((currentState) => (currentState = false));
      }
    }
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      : handleButtonClick('Short Break');
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
    if (segment === 'Short Break' || segment === 'Long Break')
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
      if (segment === 'Pomodoro') {
        changeSegmentBasedOnPomodoros();
        increasePomo();
        playFinishTimer();
      } else if (segment === 'Short Break' || segment === 'Long Break') {
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
      <div
        ref={buttonsContainerRef}
        className='timer-container__segment-buttons'
      >
        <Button
          name={'Pomodoro'}
          className='button__secondary'
          onChange={handleButtonClick}
          active={segment === 'Pomodoro' && true}
        >
          {!isSmallerButtons ? 'Pomodoro' : 'Pomo'}
        </Button>
        <Button
          name={'Short Break'}
          className='button__secondary'
          onChange={handleButtonClick}
          active={segment === 'Short Break' && true}
        >
          {!isSmallerButtons ? 'Short Break' : 'Short'}
        </Button>
        <Button
          name={'Long Break'}
          className='button__secondary'
          onChange={handleButtonClick}
          active={segment === 'Long Break' && true}
        >
          {!isSmallerButtons ? 'Long Break' : 'Long'}
        </Button>
      </div>
      <Timer time={formattedTime} />
      <div className='timer-container__play-buttons'>
        <OnOffButton
          onButtonClick={handleOnOffButton}
          name={intervalID ? 'STOP' : 'START'}
          intervalID={intervalID}
        />
        {intervalID && (
          <Button className='button__skip' onChange={handleSkipClick}>
            <BsFillSkipEndFill />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TimerContainer;

