import { createSlice } from "@reduxjs/toolkit";

const TrendingShowsslice = createSlice({
  name: "trending",
  initialState: [],
  reducers: {
    setTrending: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTrending } = TrendingShowsslice.actions;
export default TrendingShowsslice.reducer;
