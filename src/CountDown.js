import React from "react";

const CountDown = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  startPause = true,
}) => {
  const [paused, setPaused] = React.useState(startPause);
  const [over, setOver] = React.useState(false);
  const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);

  const tick = () => {
    if (paused || over) return;
    if (h === 0 && m === 0 && s === 0) setOver(true);
    else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s === 0) {
      setTime([h, m - 1, 59]);
    } else {
      setTime([h, m, s - 1]);
    }
  };

  const reset = () => {
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
    setPaused(false);
    setOver(false);
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div className="flex flex-col">
      <p className="font-semibold">{`${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}:${s.toString().padStart(2, "0")}`}</p>
      <div>{over ? "Time's up!" : ""}</div>
      {/* <button onClick={() => setPaused(!paused)}>
        {paused ? "Start" : "Pause"}
      </button> */}
      {/* <div>
        <button
          className="btn btn-square btn-sm btn-outline mr-2"
          onClick={() => setPaused(!paused)}
        >
          {paused ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="-2 0 24 24"
              className="fill-current"
            >
              <path d="M3 22v-20l18 10-18 10z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" />
            </svg>
          )}
        </button>
        <button
          className="btn btn-square btn-sm btn-outline"
          onClick={() => reset()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M2 12c0 .999.381 1.902.989 2.604l-1.098.732-.587.392c-.814-1.025-1.304-2.318-1.304-3.728 0-3.313 2.687-6 6-6h9v-3l6 4-6 4v-3h-9c-2.206 0-4 1.794-4 4zm20.696-3.728l-.587.392-1.098.732c.608.702.989 1.605.989 2.604 0 2.206-1.795 4-4 4h-9v-3l-6 4 6 4v-3h9c3.313 0 6-2.687 6-6 0-1.41-.489-2.703-1.304-3.728z" />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default CountDown;
