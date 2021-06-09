import React from "react";

import { formatDuration } from "date-fns";
const CountDown = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  startPause = true,
}) => {
  console.log(minutes);
  return (
    <div className="flex flex-col">
      <p className="font-semibold">
        {formatDuration(
          { minutes, seconds },
          { format: ["minutes", "seconds"], zero: true }
        )}
      </p>
    </div>
  );
};

export default CountDown;
