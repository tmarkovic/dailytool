import { useEffect, useCallback, useState } from 'react';
import useCountDown from 'react-countdown-hook';
import { Clock, Meter } from 'grommet';
const initialTime = 60 * 1000; // initial time in milliseconds, defaults to 60000
const interval = 1000; // interval to change remaining time amount, defaults to 1000

function Timer(props) {
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  );
  const [time, setTime] = useState(0);
  // start the timer during the first render
  useEffect(() => {
    start();
  }, []);

  const restart = useCallback(() => {
    // you can start existing timer with an arbitrary value
    // if new value is not passed timer will start with initial value
    const newTime = 42 * 1000;
    start(newTime);
  }, []);

  return (
    <>
      <Clock
        type="digital"
        time="PT0H15M0S"
        run="backward"
        hourLimit="24"
        size="xlarge"
      />
    </>
  );
}

export default Timer;
