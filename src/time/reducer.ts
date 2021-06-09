import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit'
import { RootState } from '../store';



export type TimerState = 'PRISTINE' | 'RUNNING' | 'PAUSED' | 'DONE';
export const duration = createSlice({
  name: 'duration',
  initialState: 60 * 14.1,
  reducers: {
    incrementDuration: (state) => state + 1,
    decrementDuration: (state) => state - 1,
    resetDuration: () => 0,
    setDuration: (_, { payload }) => payload
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

const reducer = combineReducers({ [duration.name]: duration.reducer, [timerState.name]: timerState.reducer })

export const timerSelector = (state: RootState) => state.time;
export const durationSelector = (state: RootState) => state.time.duration;
export const isRunningSelector = (state: RootState) => state.time.timerState === 'RUNNING'

export default reducer;