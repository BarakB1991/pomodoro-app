import React from 'react';
import './TimerMeta.css';

const TimerMeta = ({ pomoCount }) => (
  <div className='timer-meta'>
    <span>Times used Pomodoro: #{pomoCount - 1}</span>
    <p>Time to focus/rest!</p>
  </div>
);

export default TimerMeta;

