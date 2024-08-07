import { createSlice } from "@reduxjs/toolkit";

export const MoviesSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    setMovies: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMovies } = MoviesSlice.actions;

export default MoviesSlice.reducer;
