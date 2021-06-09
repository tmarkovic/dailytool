
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatTime } from '../utils'

import { decrementDuration, durationSelector, isRunningSelector } from './reducer'

export default function Timer() {
  // const [increment, _] = useState(false)
  const duration = useSelector(durationSelector)
  const isRunning = useSelector(isRunningSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isRunning && duration > 0) {
      const interval = setInterval(() => {
        dispatch(decrementDuration())
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, dispatch, duration]);
  return <h1>{formatTime(duration * 1000)}</h1>

}
