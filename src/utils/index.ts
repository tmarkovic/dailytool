export const formatTime = (time: number) => {
  const secs = Math.floor(time / 1000) % 60
  const mins = Math.floor(time / 1000 / 60) % 60
  const hrs = Math.floor(time / 1000 / 1000 / 60) % 60
  return `${padTime(hrs)}:${padTime(mins)}:${padTime(secs)}`
}

const padTime = (duration: number) => {
  return duration < 10 ? `0${duration}` : `${duration}`
}