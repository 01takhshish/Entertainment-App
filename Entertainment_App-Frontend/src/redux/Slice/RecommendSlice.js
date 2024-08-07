import { createSlice } from "@reduxjs/toolkit";

export const RecommendSlice = createSlice({
  name: "recommended",
  initialState: {
    type: "movies" || "tvShows",
    data: [],
  },
  reducers: {
    setRecommended: (state, action) => {
      return action.payload;
    },
  },
});

export const { setRecommended } = RecommendSlice.actions;
export default RecommendSlice.reducer;
