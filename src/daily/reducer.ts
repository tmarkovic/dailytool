import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit'
import { RootState } from '../store';

type Participant = {
  id: string, name: string

}

interface State {
  participants: Array<Participant>;
  started: boolean;
  timebox: number;
  duration: number;
}

const initialState: State = {
  participants: [],
  started: false,
  timebox: 0,
  duration: 0
}

const addName: CaseReducer<State, PayloadAction<{ name: string, id: string, selected: boolean }>> = (state, { payload: { id, name, selected } }) => ({
  ...state,
  participants: [
    ...state.participants,
    {
      name: name.trim(),
      id: id,
      selected: selected,
    },
  ],
});

export const dailySlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    addName,
    addNames: (state, { payload }) => {
      return {
        ...state,
        participants: [...state.participants, ...payload],
      };
    },
    removeName: (state, { payload }: { type: string, payload: string }) => {
      console.log(payload);
      return {
        ...state,
        participants: state.participants.filter((x) => x.id !== payload),
      };
    },
    resetNames: (state) => {
      return {
        ...state,
        participants: [],
      };
    }
  },
})

export const { addNames, removeName, resetNames } = dailySlice.actions
export const participantsSelector = (state: RootState) => state.daily.participants
export default dailySlice.reducer