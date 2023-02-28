import '../vendor/normalize.css';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import TimerContainer from './Main/TimerContainer/TimerContainer';
import TimerMeta from './Main/TimerMeta/TimerMeta';

function App() {
  return (
    <div className='app'>
      <Header />
      <Main>
        <TimerContainer />
        <TimerMeta />
      </Main>
    </div>
  );
}

export default App;

