import { configureStore } from "@reduxjs/toolkit";
import Bookmarksslice from "./Slice/Bookmarksslice";
import MoviesSlice from "./Slice/MoviesSlice";
import RecommendSlice from "./Slice/RecommendSlice";
import TrendingShowsslice from "./Slice/TrendingShowsslice";
import TVshowsslice from "./Slice/TVshowsslice";

const store = configureStore({
  reducer: {
    recommended: RecommendSlice,
    trending: TrendingShowsslice,
    movies: MoviesSlice,
    tvShows: TVshowsslice,
    bookmarks: Bookmarksslice,
  },
});

export default store;
