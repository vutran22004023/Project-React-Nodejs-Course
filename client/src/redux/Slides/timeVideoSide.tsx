import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    time: '',
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    timeVideo: (state, { payload }) => {
      const { time} = payload;
      state.time = time || "";
    },
  },
});

export const { timeVideo } = timeSlice.actions;
export default timeSlice.reducer;