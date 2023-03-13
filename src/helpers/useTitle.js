import { useEffect } from 'react';

function useTitle({ segment, intervalID }) {
  useEffect(() => {
    if (segment === 'Pomodoro' && intervalID) {
      document.title = 'Time to Focus!';
    } else if (
      (segment === 'Short Break' || segment === 'Long Break') &&
      intervalID
    ) {
      document.title = 'Time to rest...';
    } else {
      document.title = 'Pomodoro App';
    }
  }, [segment, intervalID]);
}

export default useTitle;
