import { useState, useEffect, useCallback } from 'react';
import useSound from 'use-sound';
import finishSound from '../sounds/finish-timer.mp3';
import startSound from '../sounds/start-timer.mp3';
import onClickSound from '../sounds/on-click.mp3';

const useTimer = (
  initialCount,
  timerMinutes,
  segment,
  onSegmentChange,
  handleIncreasePomoCount,
  pomoCount,
) => {
  const [count, setCount] = useState(initialCount);
  const [intervalID, setIntervalID] = useState(null);
  const [playOn] = useSound(onClickSound, { volume: 0.5 });
  const [playStart] = useSound(startSound, { volume: 0.5 });
  const [playFinish] = useSound(finishSound, { volume: 0.5 });

  const removeInterval = useCallback(() => {
    clearInterval(intervalID);
    setIntervalID(null);
  }, [intervalID]);

  const handleButtonClick = useCallback(
    (mode) => {
      setCount(60 * timerMinutes[mode]);
      if (intervalID) {
        removeInterval();
      }
      onSegmentChange(mode);
    },
    [timerMinutes, removeInterval, intervalID, onSegmentChange],
  );

  const handleSkipClick = () => {
    debugger;
    playOn();
    if (segment === 'Short Break' || segment === 'Long Break') {
      return handleButtonClick('Pomodoro');
    }
    changeSegmentBasedOnPomodoros();
    intervalID && handleIncreasePomoCount();
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

  const changeSegmentBasedOnPomodoros = useCallback(() => {
    (pomoCount + 1) % 4 === 0 && pomoCount !== 0
      ? handleButtonClick('Long Break')
      : handleButtonClick('Short Break');
  }, [handleButtonClick, pomoCount]);

  useEffect(() => {
    if (count < 0) {
      removeInterval();
      setCount((prevCount) => prevCount + 1);
      if (segment === 'Pomodoro') {
        handleIncreasePomoCount();
        changeSegmentBasedOnPomodoros();
        playFinish();
      } else if (segment === 'Short Break' || segment === 'Long Break') {
        handleButtonClick('Pomodoro');
        playStart();
      }
    }
  }, [
    count,
    segment,
    timerMinutes,
    removeInterval,
    handleButtonClick,
    handleIncreasePomoCount,
    changeSegmentBasedOnPomodoros,
    playStart,
    playFinish,
  ]);

  return {
    count,
    intervalID,
    handleButtonClick,
    handleOnOffButton,
    handleSkipClick,
  };
};

export default useTimer;
