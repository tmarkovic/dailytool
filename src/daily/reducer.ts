import { createSlice, PayloadAction, CaseReducer, combineReducers, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { RootState } from '../store';

type Participant = {
  id: string, name: string, selected: boolean

}

const mapName = (name: string) => ({
  name: name.trim(),
  selected: false,
  id: nanoid(),
});

const addName: CaseReducer<Array<Participant>, PayloadAction<{ name: string, id: string, selected: boolean }>> = (state, { payload }) => ([...state, payload]);

const participants = createSlice({
  name: 'participants',
  initialState: [] as Array<Participant>,
  reducers: {
    loadNames: (_, { payload }) => payload,
    addName,
    addNames: {
      reducer: (state, { payload }: PayloadAction<Array<Participant>>) => {
        return [...state, ...payload];
      },
      prepare: (names: Array<string>) => {
        return { payload: names.map(mapName) }
      }
    },
    removeName: (state, { payload }: { type: string, payload: string }) => state.filter((x) => x.id !== payload),
    pop: (state) => { return state.slice(1) },
    resetNames: (state) => {
      return []
    }
  },
})

const startedTime = createSlice({
  name: 'startedTime',
  initialState: '',
  reducers: {
    setStartedTime: (state, { payload }: PayloadAction) => payload
  }
})

export default combineReducers({
  [participants.name]: participants.reducer,
  [startedTime.name]: startedTime.reducer
})


export const shuffle = createAsyncThunk('participants/shuffle', (_, { getState, dispatch }) => {
  const { daily } = getState() as RootState
  const newState = daily.participants.sort(() => 0.5 - Math.random())
  dispatch(resetNames());
  dispatch(loadNames(newState))
})
export const { addNames, removeName, resetNames, pop, loadNames } = participants.actions
export const { setStartedTime } = startedTime.actions
export const participantsSelector = (state: RootState) => state.daily.participants
