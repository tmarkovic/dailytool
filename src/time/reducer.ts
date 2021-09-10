import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit'
import { RootState } from '../store';



export type TimerState = 'PRISTINE' | 'RUNNING' | 'PAUSED' | 'DONE';
export const duration = createSlice({
  name: 'duration',
  initialState: 60 * 15,
  reducers: {
    incrementDuration: (state) => state + 1,
    decrementDuration: (state) => state - 1,
    resetDuration: () => 0,
    setDuration: (_, { payload }) => payload
  }
})

export const startTime = createSlice({
  name: 'startTime',
  initialState: 0,
  reducers: {
    setStartTime: (_, action: PayloadAction<number>) => action.payload
  }
})

export const timerState = createSlice({
  name: 'timerState',
  initialState: 'PRISTINE' as TimerState,
  reducers: {
    setTimerState: (_, action: PayloadAction<TimerState>) => action.payload
  }
})

export const { incrementDuration,
  decrementDuration,
  resetDuration,
  setDuration } = duration.actions

export const { setTimerState } = timerState.actions
export const { setStartTime } = startTime.actions

const reducer = combineReducers({ [duration.name]: duration.reducer, [timerState.name]: timerState.reducer, [startTime.name]: startTime.reducer })

export const timerSelector = (state: RootState) => state.time;
export const durationSelector = (state: RootState) => state.time.duration;
export const startTimeSelector = (state: RootState) => state.time.startTime;
export const isRunningSelector = (state: RootState) => state.time.timerState === 'RUNNING'
export const isPristineSelector = (state: RootState) => state.time.timerState === 'PRISTINE'

export default reducer;