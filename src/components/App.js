import './App.css';
import { useCallback, useState } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import TimerContainer from './Main/TimerContainer/TimerContainer';
import TimerMeta from './Main/TimerMeta/TimerMeta';

const App = () => {
  const [pomoCount, setPomoCount] = useState(0);
  const [segment, setSegment] = useState('Pomodoro');
  // eslint-disable-next-line
  const [timerMinutes, setTimerMinutes] = useState({
    Pomodoro: 25,
    'Short Break': 5,
    'Long Break': 15,
  });

  const handleIncreasePomoCount = useCallback(() => {
    setPomoCount((prevCount) => prevCount + 1);
  }, []);

  const handleSegementChange = useCallback((mode) => {
    setSegment(mode);
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        <TimerContainer
          handleIncreasePomoCount={handleIncreasePomoCount}
          pomoCount={pomoCount}
          segment={segment}
          onSegmentChange={handleSegementChange}
          timerMinutes={timerMinutes}
        />
        <TimerMeta pomoCount={pomoCount} segment={segment} />
      </Main>
    </div>
  );
};

export default App;

