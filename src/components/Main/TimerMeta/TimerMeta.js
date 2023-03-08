import React from 'react';
import './TimerMeta.css';

const TimerMeta = ({ pomoCount, segment }) => (
  <div className='timer-meta'>
    <span>Times used Pomodoro: #{pomoCount}</span>
    <p>Time To {segment === 'Pomodoro' ? 'Focus!' : 'Rest'}</p>
  </div>
);

export default TimerMeta;

