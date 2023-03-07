import React from 'react';
import './Timer.css';

const Timer = ({ time }) => (
  <div className='timer'>
    <p className='timer__display'>{time}</p>
  </div>
);

export default Timer;

