import { Task } from './../types/types';
import { RootState } from './../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  editedTask: Task;
  csrfTokenExp: boolean;
}

const initialState: AppState = {
  editedTask: {
    id: '',
    title: '',
    description: '',
  },
  csrfTokenExp: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // editedTaskに格納するAction
    setEditedTask: (state, action: PayloadAction<Task>) => {
      state.editedTask = action.payload;
    },
    // editedTaskをリセットするAction
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask;
    },
    // csrfTokenのExpireを反転させるAction
    toggleCsrfState: (state) => {
      state.csrfTokenExp = !state.csrfTokenExp;
    },
  },
});

export const { setEditedTask, resetEditedTask, toggleCsrfState } =
  appSlice.actions;
export default appSlice.reducer;
