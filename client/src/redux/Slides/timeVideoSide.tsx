import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    time: '',
    isPlaying: false,
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    timeVideo: (state, { payload }) => {
      const { time, isPlaying} = payload;
      state.time = time || "";
      state.isPlaying = isPlaying || false;
    },
  },
});

export const { timeVideo } = timeSlice.actions;
export default timeSlice.reducer;