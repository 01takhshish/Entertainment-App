import { createSlice } from "@reduxjs/toolkit";

export const TVshowsslice = createSlice({
  name: "tvShows",
  initialState: [],
  reducers: {
    setTvShows: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTvShows } = TVshowsslice.actions;

export default TVshowsslice.reducer;
