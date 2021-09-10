
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatTime } from '../utils'

import { durationSelector, isRunningSelector, startTimeSelector } from './reducer'

export default function Timer() {
  const duration = useSelector(durationSelector) * 1000;
  const isRunning = useSelector(isRunningSelector);
  const startTime = useSelector(startTimeSelector);

  let [remainder, setRemainder] = useState(duration)

  useEffect(() => {
    if (isRunning && duration > 0) {
      const interval = setInterval(() => {
        const timeLeft = duration - (Date.now() - startTime);
        setRemainder(timeLeft);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isRunning, startTime, duration]);
  return <h1>{formatTime(remainder).combined}</h1>

}
