import { useDispatch, useSelector } from "react-redux";
import { isPristineSelector, isRunningSelector, setStartTime, setTimerState, timerSelector, TimerState } from "../time/reducer";
import { pop, setParticipantStartedTime } from "./reducer";



const Footer = () => {
  const time = useSelector(timerSelector, (l, s) => {
    return l.timerState === s.timerState;
  })
  const isRunning = useSelector(isRunningSelector);
  const isPristine = useSelector(isPristineSelector);
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
      if (isPristine) {
        const timeStamp = Date.now();
        dispatch(setStartTime(timeStamp))
        dispatch(setParticipantStartedTime(timeStamp))
      }
    }
  }
  return (
    <div className="flex">
      <button className="btn btn-outline mr-2" onClick={handlePlayPause}>
        {getIcon(time.timerState)}
      </button>
      <button className="btn btn-outline mr-2" onClick={() => {
        dispatch(pop());
        if (!isPristine) {
          dispatch(setParticipantStartedTime(Date.now()))
        }
      }}>
        next
      </button>
    </div >
  );
};

export default Footer;