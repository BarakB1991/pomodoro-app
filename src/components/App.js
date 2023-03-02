import { useCallback, useState } from 'react';
import '../vendor/normalize.css';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import TimerContainer from './Main/TimerContainer/TimerContainer';
import TimerMeta from './Main/TimerMeta/TimerMeta';

const App = () => {
  const [pomoCount, setPomoCount] = useState(1);
  // eslint-disable-next-line
  const [timerMinutes, setTimerMinutes] = useState({
    Pomodoro: 0.05,
    Break: 0.05,
    'Long Break': 0.05,
  }); // count times pomodoro been used

  const handleIncreasePomoCount = useCallback(() => {
    setPomoCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        <TimerContainer
          handleIncreasePomoCount={handleIncreasePomoCount}
          setPomoCount={setPomoCount}
          pomoCount={pomoCount}
          timerMinutes={timerMinutes}
        />
        <TimerMeta pomoCount={pomoCount} />
      </Main>
    </div>
  );
};

export default App;

