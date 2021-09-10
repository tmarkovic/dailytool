export const formatTime = (time: number) => {
  const seconds = padTime(Math.floor(time / 1000) % 60)
  const minutes = padTime(Math.floor(time / 1000 / 60) % 60)
  const hours = padTime(Math.floor(time / 1000 / 1000 / 60) % 60)
  return { combined: `${hours}:${minutes}:${seconds}`, hours, minutes, seconds }
}



const padTime = (duration: number) => {
  return duration < 10 ? `0${duration}` : `${duration}`
}