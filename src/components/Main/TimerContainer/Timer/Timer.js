import React from 'react';
import './Timer.css';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);

const Timer = ({ count }) => {
  console.log(count);

  const durationObj = dayjs.duration(count, 'seconds');
  const formattedTime = durationObj.format('mm:ss');

  return (
    <div className='timer'>
      <p className='timer__display'>{formattedTime}</p>
    </div>
  );
};

export default Timer;

