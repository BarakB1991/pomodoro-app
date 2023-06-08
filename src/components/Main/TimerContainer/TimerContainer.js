import './TimerContainer.css';
import React, { useRef, useState } from 'react';
import Button from './TimerButton/TimerButton';
import Timer from './Timer/Timer';
import OnOffButton from './OnOffButton/OnOffButton';
import useTitle from '../../../helpers/useTitle';
import useTimer from '../../../helpers/useTimer';
import useWindowResize from '../../../helpers/useWindowResize';
import { BsFillSkipEndFill } from 'react-icons/bs';

const TimerContainer = ({
  pomoCount,
  handleIncreasePomoCount,
  segment,
  onSegmentChange,
  timerMinutes,
}) => {
  const initialCount = 1500;
  const {
    count,
    intervalID,
    handleButtonClick,
    handleOnOffButton,
    handleSkipClick,
  } = useTimer(
    initialCount,
    timerMinutes,
    segment,
    onSegmentChange,
    handleIncreasePomoCount,
    pomoCount,
  );
  const [isSmallerButtons, setIsSmallerButtons] = useState(false);
  const buttonsContainerRef = useRef(null);

  useTitle({ segment, intervalID });

  useWindowResize(buttonsContainerRef, setIsSmallerButtons);

  const modeNames = {
    Pomodoro: 'Pomo',
    'Short Break': 'Short',
    'Long Break': 'Long',
  };

  return (
    <div className='timer-container'>
      <div
        ref={buttonsContainerRef}
        className='timer-container__segment-buttons'
      >
        {['Pomodoro', 'Short Break', 'Long Break'].map((mode) => (
          <Button
            key={mode}
            name={mode}
            className='button__secondary'
            onChange={handleButtonClick}
            active={segment === mode}
          >
            {!isSmallerButtons ? mode : modeNames[mode]}
          </Button>
        ))}
      </div>
      <Timer count={count} />
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

