import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface Task {
  id: string;
  text: string;
  date: string;
}

interface TasksSliceState {
  tasks: Task[];
  selectedDate: string | null;
}

// Define the initial state using that type
const initialState: TasksSliceState = {
  tasks: [],
  selectedDate: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ text: string; date: string }>) => {
      state.tasks = [
        ...state.tasks,
        {
          id: Math.random().toString(),
          text: action.payload.text,
          date: action.payload.date,
        },
      ];
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(
        ({ id }) => id !== action.payload.toString()
      );
    },

    editTask: (
      state,
      action: PayloadAction<{ id: string; text: string; index: number }>
    ) => {
      state.tasks[action.payload.index] = {
        ...state.tasks[action.payload.index],
        text: action.payload.text,
      };
    },
    showOnDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    showAll: (state) => {
      state.selectedDate = null;
    },
  },
});

export const { addTask, removeTask, editTask, showOnDate, showAll } =
  tasksSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
