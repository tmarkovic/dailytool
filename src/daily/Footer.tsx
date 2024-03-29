import { useDispatch, useSelector } from "react-redux";
import { setTimerState, timerSelector, TimerState } from "../time/reducer";
import { pop } from "./reducer";



const Footer = () => {
  const time = useSelector(timerSelector, (l, s) => {
    return l.timerState === s.timerState;
  })
  const isRunning = time.timerState === 'RUNNING'
  const dispatch = useDispatch();
  const getIcon = (s: TimerState) => {
    switch (s) {
      case 'PRISTINE': return 'start'
      case 'RUNNING': return 'pause'
      case 'PAUSED': return 'resume'
    }
  }
  function handlePlayPause() {
    if (isRunning) {
      dispatch(setTimerState('PAUSED'))
    } else {
      dispatch(setTimerState('RUNNING'))
    }
  }
  return (
    <div className="flex">
      <button className="btn btn-outline mr-2" onClick={handlePlayPause}>
        {getIcon(time.timerState)}
      </button>
      <button className="btn btn-outline mr-2" onClick={() => dispatch(pop())}>
        next
      </button>
    </div >
  );
};

export default Footer;